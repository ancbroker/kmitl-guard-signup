import { Shield, Users, CheckCircle, Phone, Mail, MapPin, ArrowDown, Check } from "lucide-react";
import insuranceBanner from "@/assets/insurance-banner.png";
import kmitlLogo from "@/assets/kmitl-logo.webp";
import ancLogo from "@/assets/anc-logo.svg";
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
      <section className="bg-gradient-to-r from-primary to-white text-foreground py-12 shadow-[var(--shadow-medium)] relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Logos */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <img 
              src={kmitlLogo} 
              alt="KMITL Logo" 
              className="h-12 w-auto object-contain"
            />
            <div className="w-px h-12 bg-foreground/30"></div>
            <img 
              src={ancLogo} 
              alt="ANC Insurtech Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Main Content - Left Text, Right Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-black">
                  ประกันอุบัติเหตุสำหรับบุคลากร สจล. และครอบครัว
                </h1>
                <p className="text-lg md:text-xl mb-6 leading-relaxed text-black">
                  สิทธิพิเศษสำหรับบุคลากร ญาติ และผู้เกษียณ สะดวก รวดเร็ว ซื้อได้ที่นี่
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-gray-600">400,000 บาท</span>
                    <span className="text-xl ml-3 text-gray-600">เสียชีวิต/ทุพพลภาพถาวร</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-gray-600">40,000 บาท</span>
                    <span className="text-xl ml-3 text-gray-600">ค่ารักษาพยาบาลต่อครั้ง</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-600">ทำประกันได้ตั้งแต่อายุ 1-91 ปี</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={scrollToForm}
                size="xl" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl px-12 py-6 rounded-xl shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-300 hover:scale-105"
              >
                กรอกข้อมูลเพื่อซื้อเลย
                <ArrowDown className="ml-3 w-6 h-6 animate-bounce" />
              </Button>
            </div>

            {/* Right Side - Image */}
            <div className="lg:justify-self-end relative h-[24rem]">
              <img 
                src={insuranceBanner} 
                alt="ประกันอุบัติเหตุ - ผู้หญิงแขนหักยิ้มแฮปปี้ มีโล่ประกันด้านหลัง" 
                className="absolute bottom-0 right-0 w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-32 -translate-x-32"></div>
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
      <section className="py-16 bg-primary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">สิทธิประโยชน์ประกันภัย</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  อัตราเบี้ยประกันตามอายุ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-1 gap-2">
                  <div>• อายุ 1-14 ปี: <span className="font-semibold">949 บาท/ปี</span></div>
                  <div>• อายุ 15-65 ปี: <span className="font-semibold">850 บาท/ปี</span></div>
                  <div>• อายุ 66-70 ปี: <span className="font-semibold">949 บาท/ปี</span></div>
                  <div>• อายุ 71-75 ปี: <span className="font-semibold">4,690 บาท/ปี</span></div>
                  <div>• อายุ 76-80 ปี: <span className="font-semibold">5,735 บาท/ปี</span></div>
                  <div>• อายุ 81-91 ปี: <span className="font-semibold">7,205 บาท/ปี</span></div>
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
          </div>
          
          {/* Coverage Details Button */}
          <div className="max-w-4xl mx-auto text-center mt-12">
            <Button 
              onClick={() => window.open('/coverage-details.pdf', '_blank')}
              variant="outline"
              className="bg-white hover:bg-brand-blue/5 text-brand-blue border-brand-blue px-8 py-3 text-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300"
            >
              ดูความคุ้มครองเพิ่มเติม
            </Button>
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