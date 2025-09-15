import { Shield, Users, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InsuranceForm from "@/components/InsuranceForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-6 shadow-[var(--shadow-medium)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Shield className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold">ประกันอุบัติเหตุ KMITL</h1>
                <p className="text-primary-foreground/90">สำหรับบุคลากร ญาติ และผู้เกษียณ</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <p>📞 02-329-8000</p>
              <p>📧 info@kmitl.ac.th</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Side - Information */}
          <div className="lg:col-span-4 space-y-6">
            {/* Benefits Card */}
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  ประโยชน์ที่ได้รับ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>ค่าชดเชยอุบัติเหตุสูงสุด 500,000 บาท</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>ค่ารักษาพยาบาลสูงสุด 50,000 บาท</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>คุ้มครอง 24 ชั่วโมง ทั่วโลก</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>เบี้ยประกันเพียง 300 บาท/ปี</span>
                </div>
              </CardContent>
            </Card>

            {/* Eligible People */}
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  ผู้มีสิทธิ์สมัคร
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>• บุคลากรของมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าลาดกระบัง</div>
                <div>• ญาติของบุคลากร (บิดา มารดา คู่สมรส บุตร)</div>
                <div>• ผู้เกษียณอายุจากมหาวิทยาลัย</div>
                <div>• อาจารย์พิเศษ</div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-[var(--shadow-soft)] bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-base">ต้องการความช่วยเหลือ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>02-329-8000 ต่อ 8200</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>hr@kmitl.ac.th</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>อาคารบริหาร ชั้น 2</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-8">
            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle className="text-xl">กรอกข้อมูลสมัครประกัน</CardTitle>
                <p className="text-muted-foreground">
                  กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง สามารถเพิ่มผู้สมัครได้หลายคน
                </p>
              </CardHeader>
              <CardContent>
                <InsuranceForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary/5 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าลาดกระบัง | ประกันอุบัติเหตุสำหรับบุคลากรและญาติ</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;