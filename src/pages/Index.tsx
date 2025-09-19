import { Shield, Users, CheckCircle, Phone, Mail, MapPin, ArrowDown, Check } from "lucide-react";
import kmitlLogo from "@/assets/kmitl-logo.webp";
import ancLogo from "@/assets/anc-logo.svg";
import insurancePeopleBanner from "@/assets/banner-desktop.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InsuranceForm from "@/components/InsuranceForm";
import Header from "@/components/Header";

const scrollToForm = () => {
  document.getElementById('insurance-form')?.scrollIntoView({ behavior: 'smooth' });
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Section 1: Hero & Intro */}
      <section className="bg-white text-foreground shadow-[var(--shadow-medium)] relative overflow-hidden" >
        <h1 className="absolute left-[-20000%] text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl font-bold mb-3 md:mb-6 lg:mb-4 xl:mb-6 leading-tight text-black">
                  ประกันอุบัติเหตุทิพยประกันภัย<br />
                  สำหรับบุคลากร สจล. และครอบครัว
                </h1>
        <div className="relative z-10 w-full">
          <img src={insurancePeopleBanner} alt="ประกันอุบัติเหตุ - ผู้ป่วยที่มีความสุขและได้รับการดูแล" />
        </div>
        {/* CTA Button */}
              <Button 
                onClick={scrollToForm}
                size="xl" 
                className="absolute z-[99] bottom-[14%] left-[9%] bg-accent hover:bg-accent/90 text-accent-foreground text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 rounded-xl shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-300 hover:scale-105"
              >
                กรอกข้อมูลเพื่อซื้อเลย
                <ArrowDown className="ml-3 w-5 h-5 md:w-6 md:h-6 animate-bounce" />
              </Button>
      </section>

          {/* Section 2: Form */}
      <section id="insurance-form" className="py-8 md:py-12 lg:py-10 xl:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">กรอกข้อมูลผู้สมัครประกัน</h2>
              <p className="text-muted-foreground">
                กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง สามารถเพิ่มผู้สมัครได้หลายคน
              </p>
            </div>
            <InsuranceForm />
          </div>
        </div>

        {/* Remove mobile banner since we now show it in main banner for all sizes */}
      </section>

      {/* Section 3: Package Details */}
      <section id="benefits-section" className="py-8 md:py-12 lg:py-10 xl:py-16 bg-primary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">สิทธิประโยชน์ประกันภัย</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Benefits Card */}
            <Card className="shadow-[var(--shadow-soft)] h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  ประโยชน์ที่ได้รับ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 pt-0">
                <div className="flex items-center gap-2 text-md">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>เสียชีวิต/ทุพพลภาพถาวรจากอุบัติเหตุ 400,000 บาท</span>
                </div>
                <div className="flex items-center gap-2 text-md">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>อุบัติเหตุสาธารณภัยสูงสุด 800,000 บาท</span>
                </div>
                <div className="flex items-center gap-2 text-md">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>ค่ารักษาพยาบาลต่ออุบัติเหตุ 40,000 บาท</span>
                </div>
                <div className="flex items-center gap-2 text-md">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>ครอบคลุมการขับขี่ และโดยสารรถจักรยานยนต์</span>
                </div>
              </CardContent>
            </Card>

            {/* Premium by Age Card */}
            <Card className="shadow-[var(--shadow-soft)] h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  อัตราเบี้ยประกันตามอายุ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-base flex-1 pt-0">
                <div className="grid grid-cols-1 gap-2">
                  <div>• อายุ 1-14 ปี: <span className="font-semibold text-orange-600">949 บาท/ปี</span></div>
                  <div>• อายุ 15-65 ปี: <span className="font-semibold text-orange-600">850 บาท/ปี</span></div>
                  <div>• อายุ 66-70 ปี: <span className="font-semibold text-orange-600">949 บาท/ปี</span></div>
                  <div>• อายุ 71-75 ปี: <span className="font-semibold text-orange-600">4,690 บาท/ปี</span></div>
                  <div>• อายุ 76-80 ปี: <span className="font-semibold text-orange-600">5,735 บาท/ปี</span></div>
                  <div>• อายุ 81-91 ปี: <span className="font-semibold text-orange-600">7,205 บาท/ปี</span></div>
                </div>
              </CardContent>
            </Card>

            {/* Eligible People */}
            <Card className="shadow-[var(--shadow-soft)] h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  ผู้มีสิทธิ์สมัคร
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-base flex-1 pt-0">
                <div>• บุคลากรของ สจล.</div>
                <div>• ครอบครัวของบุคลากร (บิดา มารดา คู่สมรส บุตร)</div>
                <div>• บุคลากรผู้เกษียณอายุ</div>
                <div>• อาจารย์พิเศษ</div>
                <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                  สำหรับผู้มีอายุ 1-91 ปี สุขภาพสมบูรณ์ แข็งแรง ไม่มีส่วนใดส่วนหนึ่งพิการหรือวิกลจริต
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Coverage Details Button */}
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Button 
              onClick={() => window.open('/coverage-details.pdf', '_blank')}
              variant="outline"
              className="bg-white hover:bg-[#4DCFFF] text-brand-blue hover:text-white border-brand-blue px-8 py-4 text-base shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300"
            >
              ดูความคุ้มครองเพิ่มเติม
            </Button>
          </div>
        </div>
      </section>

      {/* Section 4: Contact Information */}
      <section id="contact-section" className="py-8 md:py-12 lg:py-10 xl:py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">ช่องทางติดต่อ</h2>
            <p className="text-muted-foreground">
              สอบถามข้อมูลเพิ่มเติมหรือขอความช่วยเหลือ
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-[var(--shadow-soft)] h-full flex flex-col">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Phone className="w-6 h-6 text-primary" />
                  โทรศัพท์
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pt-0 space-y-3">
                <p className="text-xl font-semibold">02-881-1888</p>
                <div className="mt-4">
                  <p className="text-base font-medium">เบอร์ต่อ:</p>
                  <p className="text-md text-muted-foreground">2265 คุณธนวรรณ</p>
                  <p className="text-md text-muted-foreground">2200 คุณบัณฑิตา</p>
                  <p className="text-md text-muted-foreground">2256 คุณณิศศา</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-soft)] h-full flex flex-col">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Mail className="w-6 h-6 text-primary" />
                  อีเมล
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pt-0 space-y-3">
                <p className="text-xl font-semibold">groupeb.anc@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-soft)] h-full flex flex-col">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                  ที่อยู่
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pt-0 space-y-3">
                <p className="text-xl font-semibold">บริษัท เอ เอ็น ซี โบรกเกอร์เรจ จำกัด</p>
                <p className="text-md text-muted-foreground">126/5 ถนนสิรินธร แขวงบางพลัด เขตบางพลัด กรุงเทพฯ 10700</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-primary/5 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 ancinsurtech.com, All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;