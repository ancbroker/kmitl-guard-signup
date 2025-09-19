import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Trash2, CreditCard, ChevronDown, ChevronUp, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { DatePickerWithYearMonth } from "./DatePickerWithYearMonth";
import { postFormData, toFormData, setupPayment } from "@/lib/api";

interface PersonData {
  id: string;
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
  isExpanded?: boolean;
  beneficiaryType?: string;
  beneficiaryPrefix?: string;
  beneficiaryFirstName?: string;
  beneficiaryRelationship?: string;
  beneficiaryLastName?: string;
  beneficiaryRelationshipOther?: string;
}

const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

const getPremiumByAge = (years: number) => {
  if (years >= 1 && years <= 14) return 949;
  if (years >= 15 && years <= 65) return 850;
  if (years >= 66 && years <= 70) return 949;
  if (years >= 71 && years <= 75) return 4690;
  if (years >= 76 && years <= 80) return 5735;
  if (years >= 81 && years <= 91) return 7205;
  return 0;
};

const getPackIDByAge = (years: number) => {
  if (years >= 1 && years <= 14) return "105-282-1701";
  if (years >= 15 && years <= 65) return "105-282-1702";
  if (years >= 66 && years <= 70) return "105-282-1703";
  if (years >= 71 && years <= 75) return "105-282-1704";
  if (years >= 76 && years <= 80) return "105-282-1705";
  if (years >= 81 && years <= 91) return "105-282-1706";
  return "";
};

const relationships = [
  "บิดา",
  "มารดา", 
  "คู่สมรส",
  "บุตร",
  "ผู้เกษียณอายุ",
  "อาจารย์พิเศษ"
];

const faculties = [
  "คณะวิศวกรรมศาสตร์",
  "คณะสถาปัตยกรรม ศิลปะและการออกแบบ",
  "คณะวิทยาศาสตร์",
  "คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี",
  "คณะเทคโนโลยีการเกษตร",
  "คณะเทคโนโลยีสารสนเทศ",
  "คณะอุตสาหกรรมอาหาร",
  "คณะบริหารธุรกิจ",
  "คณะศิลปศาสตร์",
  "คณะแพทยศาสตร์",
  "คณะทันตแพทยศาสตร์",
  "คณะพยาบาลศาสตร์",
  "คณะเทคโนโลยีนวัตกรรมบูรณาการ",
  "วิทยาลัยการจัดการนวัตกรรมและอุตสาหกรรม",
  "วิทยาลัยอุตสาหกรรมการบินนานาชาติ",
  "วิทยาลัยวิศวกรรมสังคีต"
];

const titlePrefixes = [
  "นาย",
  "นาง",
  "นางสาว",
  "เด็กชาย",
  "เด็กหญิง"
];

const beneficiaryRelationships = [
  "สามี",
  "ภรรยา",
  "บิดา",
  "มารดา",
  "พี่",
  "น้อง",
  "บุตรชาย",
  "บุตรสาว",
  "อื่นๆ"
];

const InsuranceForm = () => {
  const [people, setPeople] = useState<PersonData[]>([
    {
      id: "1",
      firstName: "",
      lastName: "",
      birthDate: null,
      idNumber: "",
      email: "",
      beneficiary: "",
      referencePersonName: "",
      relationship: "",
      major: "",
      faculty: "",
      isExpanded: true,
      beneficiaryType:"ทายาทตามกฎหมาย",
      beneficiaryPrefix: "",
      beneficiaryFirstName: "",
      beneficiaryRelationship: "",
      beneficiaryLastName: "",
      beneficiaryRelationshipOther: ""
    }
  ]);
  const [showSummary, setShowSummary] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [ref1Code, setRef1Code] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string[]}>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const addPerson = () => {
    const newPerson: PersonData = {
      id: Date.now().toString(),
      firstName: "",
      lastName: "",
      birthDate: null,
      idNumber: "",
      email: "",
      beneficiary: "",
      referencePersonName: "",
      relationship: "",
      major: "",
      faculty: "",
      isExpanded: true,
      beneficiaryType:"ทายาทตามกฎหมาย",
      beneficiaryPrefix: "",
      beneficiaryFirstName: "",
      beneficiaryRelationship: "",
      beneficiaryLastName: "",
      beneficiaryRelationshipOther: ""
    };
    setPeople([...people, newPerson]);
    setShowSummary(false);
    setValidationErrors({});
  };

  const removePerson = (id: string) => {
    if (people.length > 1) {
      setPeople(people.filter(p => p.id !== id));
    }
  };

  const updatePerson = (id: string, field: keyof PersonData, value: any) => {
    setPeople(people.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
    
    // Clear validation error for this field
    if (validationErrors[id]?.includes(field as string)) {
      setValidationErrors(prev => ({
        ...prev,
        [id]: prev[id].filter(error => error !== field)
      }));
    }
  };

  const toggleExpanded = (id: string) => {
    setPeople(people.map(p => 
      p.id === id ? { ...p, isExpanded: !p.isExpanded } : p
    ));
  };

  const validateForm = () => {
    const errors: {[key: string]: string[]} = {};
    
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      const personErrors: string[] = [];
      
      if (!person.firstName) personErrors.push('firstName');
      if (!person.lastName) personErrors.push('lastName');
      if (!person.birthDate) personErrors.push('birthDate');
      if (!person.idNumber) personErrors.push('idNumber');
     // if (!person.beneficiary) personErrors.push('beneficiary');
      if (!person.referencePersonName) personErrors.push('referencePersonName');
      if (!person.relationship) personErrors.push('relationship');
      if (!person.major) personErrors.push('major');
      if (!person.faculty) personErrors.push('faculty');
      
      // Only validate email for first person
      if (i === 0 && !person.email) personErrors.push('email');
      
      if (person.idNumber && (person.idNumber.length !== 13 || !/^\d+$/.test(person.idNumber))) {
        personErrors.push('idNumber');
      }
      
      // Only validate email format for first person
      if (i === 0 && person.email && !/\S+@\S+\.\S+/.test(person.email)) {
        personErrors.push('email');
      }
      
      if (personErrors.length > 0) {
        errors[person.id] = personErrors;
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({ title: "กำลังส่งข้อมูล", description: "กำลังส่งข้อมูลผู้สมัครทั้งหมด..." });
      // const baseUrl = (import.meta as any).env?.VITE_THIRD_PARTY_SAVE_URL || '';
      // const API_URL = baseUrl.endsWith('.php') ? baseUrl : baseUrl + '.php';
      const API_URL = (import.meta as any).env?.VITE_THIRD_PARTY_SAVE_URL || 'https://ancbroker.synology.me:8122/php/third_party_save.php';
      function generateRef1() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        while (true) {
          let code = '';
          for (let i = 0; i < 15; i++) code += chars[Math.floor(Math.random() * chars.length)];
          if (/[A-Z]/.test(code) && /\d/.test(code)) return code; // ensure at least one letter & number
        }
      }
      const ref1Code = generateRef1();
      setRef1Code(ref1Code);

      function buildPayload(p: PersonData, idx: number) {
        const premium = p.birthDate ? getPremiumByAge(calculateAge(p.birthDate).years) : 0;
        const packId  = p.birthDate ? getPackIDByAge(calculateAge(p.birthDate).years) : '';
        const birthDateStr = p.birthDate ? p.birthDate.toISOString().split('T')[0] : '';
        const beneficiarySet = [
          { benName: p.beneficiaryType === 'อื่นๆ' ? p.beneficiaryFirstName : 'ทายาทตามกฎหมาย' , benLastName: p.beneficiaryType === 'อื่นๆ' ? p.beneficiaryLastName : '', benMobile: '', benEmail: idx === 0 ? p.email : '', benRelation: p.beneficiaryType === 'อื่นๆ' && p.beneficiaryRelationship === 'อื่นๆ' ? p.beneficiaryRelationshipOther : p.beneficiaryType === 'อื่นๆ' && p.beneficiaryRelationship != 'อื่นๆ' ? p.beneficiaryRelationship : 'ทายาทตามกฎหมาย', benPercent: 100 }
        ];
        const department = {
          major: p.major,
          faculty: p.faculty
        };
        const refference ={
          name: p.referencePersonName,
          relation: p.relationship
        }
        return {
          secretKey: (import.meta as any).env?.VITE_SECRET_KEY || '',
          checkbiaUrl: (import.meta as any).env?.VITE_CHECKBIA_URL || 'http://localhost:8121',
          prakunUrl: (import.meta as any).env?.VITE_PRAKUN_URL || 'https://www.prakun.com',
          assured_add_street: '',
          assured_add_country: 'th',
          assured_type: 'P',
          assured_card_type: 'P',
          assured_email: people[0].email,
          assured_name: `${p.firstName}`.trim(),
          assured_lastname: `${p.lastName}`.trim(),
          assured_bdate: birthDateStr,
          assured_czid: p.idNumber,
          q_hp_sex: '',
          q_to_name: `${p.firstName} ${p.lastName}`.trim(),
          q_to_email: people[0].email,
          q_agt_id: (import.meta as any).env?.VITE_Q_AGT_ID || '2435',
          q_vmi_startCover: '',
          q_vmi_stopCover: '',
          
          qsub_vmi_NETPREMIUM: String(premium),
          qsub_vmi_PREMIUM: String(premium),
          qsub_vmi_INS: (import.meta as any).env?.VITE_INS_CODE || '',
          qsub_vmi_INSID: (import.meta as any).env?.VITE_INS_ID || '',
          qsub_vmi_POTYPEID: '2411',
          qsub_vmi_POTYPE: 'PA',
          qsub_vmi_IDPACK: packId,
          qsub_vmi_PACKNAME: (import.meta as any).env?.VITE_PLAN_NAME || '',
          q_no: '',
          note: JSON.stringify(department),
          REF1: ref1Code,
          payMethod: 'bank',
          mkt_id: '',
          resultType: 'json',
          q_type_source: 'new',
          q_tag: '',
          q_old_pono: '',
          leadType: 'D2F',
          status_order: 'summary',
          beneficiarySet: JSON.stringify(beneficiarySet),
          json_object: '',
          AfterPay: '',
          AfterReceivePolicy: '',
          qsub_type_group: 'PA',
          comission_affiliate: '',
          comission_baht_vmi: '',
          comission_baht_cmi: '',
          q_login_id: '',
          paidGroup: ref1Code,
          assured_ref_person: JSON.stringify(refference)
        };
      }

      const results: { raw: any; ok: boolean; index: number; error?: string; blind?: boolean }[] = [];
      for (let i = 0; i < people.length; i++) {
        const payload = buildPayload(people[i], i);
        const fd = toFormData(payload);
        try {
          const resp = await fetch(API_URL, { method: 'POST', body: fd });
          let text: string | null = null;
          let parsed: any = null;
          try { text = await resp.text(); } catch { /* body unreadable due to CORS; treat as blind success */ }
          
          if (text) { try { parsed = JSON.parse(text); } catch { /* not JSON */ } }
          const status = parsed?.Status;
          const msg = parsed?.Msg;
          if (status === '0' && msg === 'Success') {
            results.push({ raw: parsed, ok: true, index: i });
          } else if (!text && resp.ok) {
            // Single attempt, body not readable but request likely delivered
            results.push({ raw: null, ok: true, index: i, blind: true });
          } else {
            results.push({ raw: parsed ?? text, ok: false, index: i, error: `Status=${status} Msg=${msg}` });
            toast({ title: 'รายการล้มเหลว', description: `ผู้สมัครที่ ${i + 1}: ${msg || 'ไม่สำเร็จ'}`, variant: 'destructive' });
          }
        } catch (err: any) {
          results.push({ raw: null, ok: false, index: i, error: err?.message });
          toast({ title: 'เชื่อมต่อไม่สำเร็จ', description: `ผู้สมัครที่ ${i + 1}: ${err?.message || 'ไม่ทราบสาเหตุ'}`, variant: 'destructive' });
        }
      }

      const allSuccess = results.every(r => r.ok);
      const blindCount = results.filter(r => r.blind).length;
      if (allSuccess) {
        const desc = blindCount > 0
          ? `ทั้งหมด ${people.length} รายการ `
          : `ทั้งหมด ${people.length} รายการ `;
        toast({ title: 'ส่งข้อมูลสำเร็จ', description: desc });
        setShowSummary(true);
      } else {
        const failed = results.filter(r => !r.ok).map(r => r.index + 1).join(', ');
        toast({ title: 'บางรายการไม่สำเร็จ', description: `ล้มเหลว: ${failed}`, variant: 'destructive' });
      }
      
    } catch (error: any) {
      toast({ title: "ส่งข้อมูลไม่สำเร็จ", description: error?.message || "เกิดข้อผิดพลาดในการส่งข้อมูล", variant: "destructive" });
    }
  };

  const proceedToPayment = async () => {
    if (paymentLoading) return;
    try {
      setPaymentLoading(true);
      toast({ title: 'กำลังเข้าสู่หน้าชำระเงิน', description: 'กำลังสร้างรายการชำระเงิน...' });
      // Map current people to payment shape
      const paymentPeople = people.map((p, idx) => {
        const ageYears = p.birthDate ? calculateAge(p.birthDate).years : 0;
        return {
          firstName: p.firstName,
            lastName: p.lastName,
          email: idx === 0 ? p.email : '',
          idNumber: p.idNumber,
          premium: p.birthDate ? getPremiumByAge(ageYears) : 0,
          tel: ''
        };
      });
  const successUrl = window.location.origin + '/#/success';
      await setupPayment({
        people: paymentPeople,
        totalPremium,
        agentId: (import.meta as any).env?.VITE_Q_AGT_ID,
        insCode: (import.meta as any).env?.VITE_INS_CODE,
        planName: (import.meta as any).env?.VITE_PLAN_NAME || 'KMITL Guard',
        successUrl,
        detailUrl: successUrl,
        updateUrl: (import.meta as any).env?.VITE_CHECKBIA_URL ? `${(import.meta as any).env?.VITE_CHECKBIA_URL}/admin/paid-update.php?ref=${ref1Code}` : successUrl,
        qNo: ref1Code || undefined,
        ref1: ref1Code
      });
    } catch (err: any) {
      toast({ title: 'ไม่สามารถไปหน้าชำระเงิน', description: err?.message || 'เกิดข้อผิดพลาด', variant: 'destructive' });
    } finally {
      setPaymentLoading(false);
    }
  };

  const totalPremium = people.reduce((total, person) => {
    if (person.birthDate) {
      const age = calculateAge(person.birthDate);
      return total + getPremiumByAge(age.years);
    }
    return total;
  }, 0);

  if (showSummary) {
    return (
      <div className="space-y-6">
        {/* Summary Section */}
        <Card className="shadow-[var(--shadow-medium)] border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl text-center" style={{color: '#4DCFFF'}}>
              สรุปรายการสมัครประกัน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {people.map((person, index) => {
                const age = person.birthDate ? calculateAge(person.birthDate) : null;
                const premium = age ? getPremiumByAge(age.years) : 0;
                
                return (
                  <div key={person.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{person.firstName} {person.lastName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {age ? `อายุ ${age.years} ปี ${age.months} เดือน` : 'ไม่ระบุอายุ'} 
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{premium.toLocaleString()} บาท</div>
                      <div className="text-xs text-muted-foreground">ต่อปี</div>
                    </div>
                  </div>
                );
              })}
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>รวมเบี้ยประกันทั้งหมด</span>
                  <span className="text-primary">{totalPremium.toLocaleString()} บาท</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  สำหรับ {people.length} คน (รวมอากรแสตมป์แล้ว)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setShowSummary(false)}
            className="flex-1 py-3 text-sm"
          >
            กลับไปแก้ไขข้อมูล
          </Button>
          <Button
            variant="default"
            size="xl"
            onClick={proceedToPayment}
            disabled={paymentLoading}
            className="flex-1 py-3 text-sm disabled:opacity-70"
            style={{backgroundColor: '#4DCFFF', color: 'white'}}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {paymentLoading ? 'กำลังไปหน้าชำระเงิน...' : `ไปชำระเงิน ${totalPremium.toLocaleString()} บาท`}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {people.map((person, index) => (
        <Card key={person.id} className="shadow-[var(--shadow-soft)] border-l-4 border-l-primary/30">
          <Collapsible 
            open={person.isExpanded} 
            onOpenChange={() => toggleExpanded(person.id)}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-4 cursor-pointer hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {person.firstName && person.lastName 
                          ? `${person.firstName} ${person.lastName}` 
                          : `ผู้สมัครคนที่ ${index + 1}`}
                      </CardTitle>
                      {person.birthDate && (
                        <p className="text-sm text-muted-foreground">
                          อายุ {calculateAge(person.birthDate).years} ปี • เบี้ย {getPremiumByAge(calculateAge(person.birthDate).years).toLocaleString()} บาท/ปี
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {people.length > 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePerson(person.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    {person.isExpanded ? 
                      <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    }
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Fields */}
                  <div>
                    <Label htmlFor={`firstName-${person.id}`}>ชื่อ *</Label>
                    <Input
                      id={`firstName-${person.id}`}
                      value={person.firstName}
                      onChange={(e) => updatePerson(person.id, "firstName", e.target.value)}
                      placeholder="กรอกชื่อ"
                      className={cn(validationErrors[person.id]?.includes('firstName') && "border-red-500 focus:border-red-500")}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`lastName-${person.id}`}>นามสกุล *</Label>
                    <Input
                      id={`lastName-${person.id}`}
                      value={person.lastName}
                      onChange={(e) => updatePerson(person.id, "lastName", e.target.value)}
                      placeholder="กรอกนามสกุล"
                      className={cn(validationErrors[person.id]?.includes('lastName') && "border-red-500 focus:border-red-500")}
                    />
                  </div>

                  {/* Birth Date */}
                  <div>
                    <Label>วันเดือนปีเกิด *</Label>
                    <div className={cn(validationErrors[person.id]?.includes('birthDate') && "border border-red-500 rounded-md")}>
                      <DatePickerWithYearMonth
                        date={person.birthDate || undefined}
                        onSelect={(date) => updatePerson(person.id, "birthDate", date)}
                        placeholder="เลือกวันเกิด"
                        disabled={(date) => {
                          const today = new Date();
                          const maxAge = new Date(today.getFullYear() - 91, today.getMonth(), today.getDate());
                          const minAge = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
                          return date > minAge || date < maxAge;
                        }}
                      />
                    </div>
                    {person.birthDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        อายุ {calculateAge(person.birthDate).years} ปี {calculateAge(person.birthDate).months} เดือน {calculateAge(person.birthDate).days} วัน
                        • เบี้ยประกัน {getPremiumByAge(calculateAge(person.birthDate).years).toLocaleString()} บาท/ปี
                      </p>
                    )}
                  </div>

                  {/* ID Number */}
                  <div>
                    <Label htmlFor={`idNumber-${person.id}`}>เลขบัตรประชาชน (13 หลัก) *</Label>
                    <Input
                      id={`idNumber-${person.id}`}
                      value={person.idNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 13);
                        updatePerson(person.id, "idNumber", value);
                      }}
                      placeholder="1234567890123"
                      maxLength={13}
                      className={cn(validationErrors[person.id]?.includes('idNumber') && "border-red-500 focus:border-red-500")}
                    />
                  </div>

                  {/* Email - Only for first person */}
                  {index === 0 && (
                    <div>
                      <Label htmlFor={`email-${person.id}`}>อีเมล *</Label>
                        <Input
                          id={`email-${person.id}`}
                          type="email"
                          value={person.email}
                          onChange={(e) => updatePerson(person.id, "email", e.target.value)}
                          placeholder="example@email.com"
                          className={cn(validationErrors[person.id]?.includes('email') && "border-red-500 focus:border-red-500")}
                        />
                    </div>
                  )}

                  {/* Reference Person */}
                  <div>
                    <Label htmlFor={`referencePerson-${person.id}`}>ชื่อบุคคลอ้างอิง (บุคลากรของ สจล.) *</Label>
                    <Input
                      id={`referencePerson-${person.id}`}
                      value={person.referencePersonName}
                      onChange={(e) => updatePerson(person.id, "referencePersonName", e.target.value)}
                      placeholder="ชื่อบุคลากร สจล."
                      className={cn(validationErrors[person.id]?.includes('referencePersonName') && "border-red-500 focus:border-red-500")}
                    />
                  </div>

                  {/* Relationship */}
                  <div>
                    <Label>ความสัมพันธ์กับบุคลากร *</Label>
                    <Select
                      value={person.relationship}
                      onValueChange={(value) => updatePerson(person.id, "relationship", value)}
                    >
                      <SelectTrigger className={cn("bg-background", validationErrors[person.id]?.includes('relationship') && "border-red-500 focus:border-red-500")}>
                        <SelectValue placeholder="เลือกความสัมพันธ์" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border shadow-[var(--shadow-medium)]">
                        {relationships.map((rel) => (
                          <SelectItem key={rel} value={rel}>
                            {rel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Major */}
                  <div>
                    <Label htmlFor={`major-${person.id}`}>สาขาวิชา *</Label>
                    <Input
                      id={`major-${person.id}`}
                      value={person.major}
                      onChange={(e) => updatePerson(person.id, "major", e.target.value)}
                      placeholder="กรอกสาขาวิชา"
                      className={cn(validationErrors[person.id]?.includes('major') && "border-red-500 focus:border-red-500")}
                    />
                  </div>

                  {/* Faculty */}
                  <div>
                    <Label>คณะ *</Label>
                    <Select
                      value={person.faculty}
                      onValueChange={(value) => updatePerson(person.id, "faculty", value)}
                    >
                      <SelectTrigger className={cn("bg-background", validationErrors[person.id]?.includes('faculty') && "border-red-500 focus:border-red-500")}>
                        <SelectValue placeholder="เลือกคณะ" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border shadow-[var(--shadow-medium)]">
                        {faculties.map((faculty) => (
                          <SelectItem key={faculty} value={faculty}>
                            {faculty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                 
                </div>
                 {/* Beneficiary Information Section */}
              <div className="border-t pt-6 px-6 pb-6">
                <h4 className="font-medium text-base text-gray-700 mb-4">ข้อมูลผู้รับประโยชน์</h4>
                
                {/* Beneficiary Type */}
                <div className="mb-4">
                  <Label>ประเภทผู้รับประโยชน์ *</Label>
                  <Select
                    value={person.beneficiaryType}
                    onValueChange={(value) => updatePerson(person.id, "beneficiaryType", value)}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="เลือกประเภทผู้รับประโยชน์" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ทายาทตามกฎหมาย">ทายาทตามกฎหมาย</SelectItem>
                      <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Show additional fields if "อื่นๆ" is selected */}
                {person.beneficiaryType === 'อื่นๆ' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Beneficiary Prefix */}
                    <div>
                      <Label>คำนำหน้า *</Label>
                      <Select
                        value={person.beneficiaryPrefix}
                        onValueChange={(value) => updatePerson(person.id, "beneficiaryPrefix", value)}
                      >
                        <SelectTrigger className={cn("bg-background", validationErrors[person.id]?.includes('beneficiaryPrefix') && "border-red-500 focus:border-red-500")}>
                          <SelectValue placeholder="เลือกคำนำหน้า" />
                        </SelectTrigger>
                        <SelectContent>
                          {titlePrefixes.map((prefix) => (
                            <SelectItem key={prefix} value={prefix}>
                              {prefix}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Beneficiary First Name */}
                    <div>
                      <Label>ชื่อ *</Label>
                      <Input
                        value={person.beneficiaryFirstName}
                        onChange={(e) => updatePerson(person.id, "beneficiaryFirstName", e.target.value)}
                        placeholder="ชื่อผู้รับประโยชน์"
                        className={cn(validationErrors[person.id]?.includes('beneficiaryFirstName') && "border-red-500 focus:border-red-500")}
                      />
                    </div>

                    {/* Beneficiary Last Name */}
                    <div>
                      <Label>นามสกุล *</Label>
                      <Input
                        value={person.beneficiaryLastName}
                        onChange={(e) => updatePerson(person.id, "beneficiaryLastName", e.target.value)}
                        placeholder="นามสกุลผู้รับประโยชน์"
                        className={cn(validationErrors[person.id]?.includes('beneficiaryLastName') && "border-red-500 focus:border-red-500")}
                      />
                    </div>

                    {/* Beneficiary Relationship */}
                    <div>
                      <Label>ความสัมพันธ์ *</Label>
                      <Select
                        value={person.beneficiaryRelationship}
                        onValueChange={(value) => updatePerson(person.id, "beneficiaryRelationship", value)}
                      >
                        <SelectTrigger className={cn("bg-background", validationErrors[person.id]?.includes('beneficiaryRelationship') && "border-red-500 focus:border-red-500")}>
                          <SelectValue placeholder="เลือกความสัมพันธ์" />
                        </SelectTrigger>
                        <SelectContent>
                          {beneficiaryRelationships.map((relationship) => (
                            <SelectItem key={relationship} value={relationship}>
                              {relationship}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Other Relationship Input - Full width when visible */}
                    {person.beneficiaryRelationship === 'อื่นๆ' && (
                      <div className="md:col-span-2">
                        <Label>ระบุความสัมพันธ์ *</Label>
                        <Input
                          value={person.beneficiaryRelationshipOther}
                          onChange={(e) => updatePerson(person.id, "beneficiaryRelationshipOther", e.target.value)}
                          placeholder="ระบุความสัมพันธ์"
                          className={cn(validationErrors[person.id]?.includes('beneficiaryRelationshipOther') && "border-red-500 focus:border-red-500")}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          size="xl"
          onClick={addPerson}
          className="flex-1 py-3 text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มผู้เอาประกัน
        </Button>
        
        <Button
          size="xl"
          onClick={handleSubmit}
          className="flex-1 bg-[#75DAFF] hover:bg-[#75DAFF]/90 text-white py-3 text-sm"
          disabled={people.some(p => !p.firstName || !p.lastName || !p.birthDate)}
        >
          ดูสรุปรายการ ({people.length} คน)
          {totalPremium > 0 && ` • ${totalPremium.toLocaleString()} บาท`}
        </Button>
      </div>
    </div>
  );
};

export default InsuranceForm;