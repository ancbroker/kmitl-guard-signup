// src/lib/api.ts

export async function callApi<T = any>(
  url: string,
  options?: (RequestInit & { parseAs?: 'json' | 'text' })
): Promise<T> {
  try {
    const response = await fetch(url, options);
    console.log('API Response:', response);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const parseAs = options?.parseAs;
    if (parseAs === 'text') {
      return (await response.text()) as unknown as T;
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as T;
    }
    return (await response.text()) as unknown as T;
  } catch (error) {
    throw error;
  }
}

// Build FormData from a plain object (strings/nums are stringified; objects are JSON.stringified)
export function toFormData(payload: Record<string, any>): FormData {
  const fd = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      fd.append(key, '');
    } else if (value instanceof Blob) {
      fd.append(key, value);
    } else if (typeof value === 'object') {
      fd.append(key, JSON.stringify(value));
    } else {
      fd.append(key, String(value));
    }
  });
  return fd;
}

export async function postFormData<T = any>(
  url: string,
  formData: FormData,
  parseAs: 'json' | 'text' = 'json'
) {
  return callApi<T>(url, { method: 'POST', body: formData, parseAs });
}

// Types for form-based payment
export type PersonForm = {
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  premium?: number;
  tel?: string;
};

export type CreateTransactionArgs = {
  people: PersonForm[];
  agentId?: string | number;
  insCode?: string;
  planName?: string;
  successUrl?: string;
  detailUrl?: string;
  updateUrl?: string;
  qNo?: string;
  ref1?: string;
  ippInterestType?: 'M' | 'C';
};

// Utility: format Date to YYYY-MM-DD
function toISODate(d: Date | null | undefined): string {
  if (!d) return '';
  try {
    return new Date(d).toISOString().split('T')[0];
  } catch {
    return '';
  }
}

// สร้าง payload สำหรับ API จากข้อมูลฟอร์ม (สำหรับส่วน order อื่นๆ)
export function createOrderPayload(people: Array<{
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  idNumber: string;
  email: string;
  beneficiary: string;
  referencePersonName: string;
  relationship: string;
  major: string;
  faculty: string;
}>): any {
  const main = people[0];
  return {
    assured_name: `${main.firstName} ${main.lastName}`,
    assured_bdate: toISODate(main.birthDate),
    assured_id: main.idNumber,
    assured_email: main.email,
    beneficiary: main.beneficiary,
    reference_person: main.referencePersonName,
    relationship: main.relationship,
    major: main.major,
    faculty: main.faculty,
    insured_list: people.map((p) => ({
      name: `${p.firstName} ${p.lastName}`,
      birthDate: toISODate(p.birthDate),
      idNumber: p.idNumber,
      beneficiary: p.beneficiary,
      relationship: p.relationship,
      major: p.major,
      faculty: p.faculty,
    })),
  };
}

// ฟังก์ชันสำหรับจัดการ Payment Flow จากข้อมูลฟอร์มโดยตรง
export async function setupPayment(args: CreateTransactionArgs & { totalPremium: number }) {
  try {
    if (args.totalPremium > 0) {
      const result: any = await createTransection(args);
      const redirectUrl = result?.url;
      const httpCode = result?.http_code || result?.status;
      if (redirectUrl && (httpCode === 200 || httpCode === 201)) {
        window.location.href = redirectUrl;
      } else {
        console.log('เกิดข้อผิดพลาดในการชำระเงิน', result);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// สร้าง Transaction จากข้อมูลฟอร์ม
export async function createTransection(params: CreateTransactionArgs) {
  const people = params.people;
  const main = people[0];
  const ref1Value = params.ref1;
  const orders = people.map((p) => ({
    orderName: params.planName || 'KMITL Guard Plan',
    orderItem: 1,
    orderINSCode: 2051,
    orderPay: (p.premium ?? 0).toFixed(2),
    orderImgUrl: '',
    orderType: 'PA',
    orderPrice: (p.premium ?? 0).toFixed(2),
  }));
  const ordersSum = orders
    .map((o) => parseFloat(o.orderPrice))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  const payload = {
    type: 'createTrans',
    mytype: 'PA',
    my_sub_type: '',
    data: {
      cusNameFull: `${main.firstName} ${main.lastName}`,
      cusMobile: main.tel || '',
      cusEmail: main.email,
      cusAddress: '',
      cusCardId: main.idNumber,
      orders: JSON.stringify(orders),
      ordersSum,
      ippInterestType: params.ippInterestType || 'M',
      idAgt: (params.agentId ?? '').toString(),
      ins_code: params.insCode || '',
      urlDetail: params.detailUrl || '',
      urlRedirectSuccess: params.successUrl || '',
      urlRedirectBack: params.successUrl || '',
      urlUpdate: params.updateUrl || '',
      ref1: params.ref1 || '',
      ref2: '',
      ref3: ordersSum,
      options: JSON.stringify({ display: [
                "credit_card",
                "qrcode",
                "mobilebank",
                // "creditcard-broker",
                // "creditcard-insurer",
                // "recurring",
                // "installment-cash",
                // "installment-credit",
                // "tranfer-cash-broker",
                // "tranfer-cash-insurer",
            ]}),
      isAutoRenew: 'n',
    },
  };

  const paymentEndpoint = (import.meta as any).env?.VITE_PAYMENT_ENDPOINT || '/service/payment.php';
  try {
    const resp = await fetch(paymentEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'createTrans', data: payload.data }),
    });
    let json: any = null;
    try { json = await resp.json(); } catch { /* ignore parse error */ }
    if (!resp.ok) {
      return { status: resp.status, error: true, response: json };
    }
    return json;
  } catch (error: any) {
    return { status: 'error', error };
  }
}
