import { Shield, Users, CheckCircle, Phone, Mail, MapPin, ArrowDown, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InsuranceForm from "@/components/InsuranceForm";

const scrollToForm = () => {
  document.getElementById('insurance-form')?.scrollIntoView({ behavior: 'smooth' });
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Section 1: Hero & Intro */}
      <section className="bg-gradient-to-br from-primary via-primary-glow to-accent text-primary-foreground py-16 shadow-[var(--shadow-medium)]">
        <div className="container mx-auto px-4">
          {/* Logos */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <Building2 className="w-12 h-12" />
              <div className="text-center">
                <h3 className="font-bold text-lg">KMITL</h3>
                <p className="text-xs opacity-90">มหาวิทยาลัยเทคโนโลยี<br/>พระจอมเกล้าลาดกระบัง</p>
              </div>
            </div>
            <div className="w-px h-16 bg-primary-foreground/30"></div>
            <div className="flex items-center gap-3">
              <Shield className="w-12 h-12" />
              <div className="text-center">
                <h3 className="font-bold text-lg">ทิพยประกันภัย</h3>
                <p className="text-xs opacity-90">พาร์ทเนอร์ประกันอุบัติเหตุ</p>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ประกันอุบัติเหตุสำหรับบุคลากร สจล. และครอบครัว
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              สิทธิพิเศษสำหรับบุคลากร ญาติ และผู้เกษียณ สะดวก รวดเร็ว ซื้อได้ที่นี่
            </p>

            {/* Highlight Coverage */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">400,000 บาท</div>
                <div className="text-sm opacity-90">เสียชีวิต/ทุพพลภาพถาวร</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">40,000 บาท</div>
                <div className="text-sm opacity-90">ค่ารักษาพยาบาลต่อครั้ง</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">850 บาท/ปี</div>
                <div className="text-sm opacity-90">เบี้ยประกัน (อายุ 15-65 ปี)</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              onClick={scrollToForm}
              size="xl" 
              variant="secondary"
              className="text-lg px-8 py-4 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-300"
            >
              กรอกข้อมูลเพื่อซื้อเลย
              <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Form */}
      <section id="insurance-form" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">กรอกข้อมูลผู้สมัครประกัน</h2>
              <p className="text-muted-foreground">
                กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง สามารถเพิ่มผู้สมัครได้หลายคน
              </p>
            </div>
            <InsuranceForm />
          </div>
        </div>
      </section>

      {/* Section 3: Package Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                  <span>เสียชีวิต/ทุพพลภาพถาวรจากอุบัติเหตุ 400,000 บาท</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>อุบัติเหตุสาธารณภัยสูงสุด 800,000 บาท</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>ค่ารักษาพยาบาลต่ออุบัติเหตุ 40,000 บาท</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>คุ้มครอง 24 ชั่วโมง ทั่วโลก</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>เบี้ยประกันเริ่มต้น 850 บาท/ปี</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>ครอบคลุมการขับขี่รถจักรยานยนต์</span>
                </div>
              </CardContent>
            </Card>

            {/* Premium by Age Card */}
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-5 h-5 text-primary" />
                  อัตราเบี้ยประกันตามอายุ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>• อายุ 1-14 ปี: <span className="font-semibold">949 บาท/ปี</span></div>
                  <div>• อายุ 15-65 ปี: <span className="font-semibold text-primary">850 บาท/ปี</span></div>
                  <div>• อายุ 66-70 ปี: <span className="font-semibold">949 บาท/ปี</span></div>
                  <div>• อายุ 71-75 ปี: <span className="font-semibold">4,690 บาท/ปี</span></div>
                  <div>• อายุ 76-80 ปี: <span className="font-semibold">5,735 บาท/ปี</span></div>
                  <div>• อายุ 81-91 ปี: <span className="font-semibold">7,205 บาท/ปี</span></div>
                </div>
                <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                  * เบี้ยประกันรวมอากรแสตมป์ 0.4% แล้ว
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
                <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                  สำหรับผู้มีอายุ 1-91 ปี สุขภาพสมบูรณ์ แข็งแรง
                </div>
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
        </div>
      </section>

      {/* Section 4: Notes & Contact */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                *สิทธิการซื้อเฉพาะบุคลากร สจล. ญาติสายตรง และผู้เกษียณเท่านั้น
              </p>
              <p className="text-sm text-muted-foreground">
                *เบี้ยประกันรวมอากรแสตมป์ 0.4% แล้ว (ค่าภาษียกเว้น ไม่ต้องชำระ)
              </p>
            </div>
            
            <Card className="shadow-[var(--shadow-soft)] bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg">ต้องการความช่วยเหลือ?</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>02-329-8000 ต่อ 8200</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>hr@kmitl.ac.th</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>อาคารบริหาร ชั้น 2</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าลาดกระบัง | ประกันอุบัติเหตุสำหรับบุคลากรและญาติ</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;