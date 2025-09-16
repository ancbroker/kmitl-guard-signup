import { Shield, Users, CheckCircle, Phone, Mail, MapPin, ArrowDown, Check } from "lucide-react";
import kmitlLogo from "@/assets/kmitl-logo.webp";
import ancLogo from "@/assets/anc-logo.svg";
import insurancePeopleBanner from "@/assets/insurance-people-banner.png";
import silverShield from "@/assets/silver-shield.png";
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
      <section className="bg-gradient-to-r from-primary to-white text-foreground pt-12 pb-12 shadow-[var(--shadow-medium)] relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Logos */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <img 
              src={ancLogo} 
              alt="ANC Insurtech Logo" 
              className="h-12 w-auto object-contain"
            />
            <div className="w-px h-12 bg-foreground/30"></div>
            <img 
              src={kmitlLogo} 
              alt="KMITL Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Main Content - Left Text, Right Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-black">
                  ประกันอุบัติเหตุทิพยประกันภัย<br />
                  สำหรับบุคลากร สจล. และครอบครัว
                </h1>
                <p className="text-lg md:text-xl mb-6 leading-relaxed text-black">
                  สิทธิพิเศษสำหรับบุคลากร ญาติ และผู้เกษียณ สะดวก รวดเร็ว ซื้อได้ที่นี่
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-white">
                    <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-600">เสียชีวิต/ทุพพลภาพถาวร 400,000 บาท</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-white">
                    <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-600">ค่ารักษาพยาบาลต่อครั้ง 40,000 บาท</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-white">
                    <Check className="w-4 h-4 text-accent" strokeWidth={3} />
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

          </div>

          {/* Banner Image - Absolute positioned at bottom */}
          <div className="absolute bottom-0 right-0 w-1/2 h-96 lg:block hidden">
            {/* Silver Shield Background at bottom of banner */}
            <div className="absolute -bottom-16 left-8 z-0">
              <img 
                src={silverShield} 
                alt="Silver protective shield representing insurance coverage" 
                className="w-[550px] h-auto object-contain opacity-25 drop-shadow-2xl"
              />
            </div>

            {/* Additional Protection Graphics */}
            {/* Protective Circles */}
            <div className="absolute top-16 right-20 animate-pulse z-0" style={{animationDuration: '3s'}}>
              <div className="w-32 h-32 rounded-full border-4 border-blue-400/30 bg-blue-400/10"></div>
            </div>
            <div className="absolute bottom-32 left-16 animate-pulse z-0" style={{animationDuration: '4s', animationDelay: '1s'}}>
              <div className="w-24 h-24 rounded-full border-3 border-orange-400/35 bg-orange-400/15"></div>
            </div>

            {/* Safety Umbrellas */}
            <div className="absolute top-24 left-24 z-0">
              <div className="w-16 h-12 bg-gradient-to-b from-blue-400/40 to-blue-500/25 rounded-t-full relative">
                <div className="absolute bottom-0 left-1/2 w-1 h-6 bg-blue-600/50 transform -translate-x-1/2"></div>
              </div>
            </div>
            <div className="absolute bottom-40 right-32 z-0">
              <div className="w-12 h-8 bg-gradient-to-b from-orange-400/45 to-orange-500/30 rounded-t-full relative">
                <div className="absolute bottom-0 left-1/2 w-0.5 h-4 bg-orange-600/55 transform -translate-x-1/2"></div>
              </div>
            </div>

            {/* Medical Cross Icons */}
            <div className="absolute top-32 right-28 z-0">
              <div className="w-10 h-10 relative">
                <div className="absolute top-1/2 left-1/2 w-8 h-2 bg-blue-500/40 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-8 bg-blue-500/40 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            <div className="absolute bottom-28 left-28 z-0">
              <div className="w-8 h-8 relative">
                <div className="absolute top-1/2 left-1/2 w-6 h-1.5 bg-orange-500/45 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-1.5 h-6 bg-orange-500/45 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>

            {/* Heart Protection Symbol */}
            <div className="absolute top-40 left-32 z-0">
              <div className="w-12 h-12 relative">
                <div className="absolute top-3 left-3 w-3 h-3 bg-blue-400/35 rounded-full transform -rotate-45"></div>
                <div className="absolute top-3 right-3 w-3 h-3 bg-blue-400/35 rounded-full transform -rotate-45"></div>
                <div className="absolute top-5 left-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4 border-l-transparent border-r-transparent border-t-blue-400/35 transform -translate-x-1/2"></div>
              </div>
            </div>

            {/* Glow Effects */}
            <div className="absolute top-1/3 right-1/3 z-0">
              <div className="w-40 h-40 bg-gradient-radial from-blue-400/15 to-transparent rounded-full animate-pulse" style={{animationDuration: '5s'}}></div>
            </div>
            <div className="absolute bottom-1/4 left-1/4 z-0">
              <div className="w-32 h-32 bg-gradient-radial from-orange-400/12 to-transparent rounded-full animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
            </div>
            
            <div className="absolute bottom-0 right-0 z-10">
              <img 
                src={insurancePeopleBanner} 
                alt="ประกันอุบัติเหตุ - ผู้ป่วยที่มีความสุขและได้รับการดูแล" 
                className="w-full h-auto object-contain drop-shadow-lg scale-110"
              />
            </div>

            {/* Top Layer Blue Graphics and Light Effects */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Floating Blue Light Particles */}
              <div className="absolute top-16 right-24 animate-pulse" style={{animationDuration: '2s'}}>
                <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
              </div>
              <div className="absolute top-32 right-40 animate-pulse" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
                <div className="w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_15px_rgba(147,197,253,0.7)]"></div>
              </div>
              <div className="absolute bottom-40 right-16 animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}>
                <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_25px_rgba(37,99,235,0.9)]"></div>
              </div>
              <div className="absolute bottom-60 right-32 animate-pulse" style={{animationDuration: '2.2s', animationDelay: '1.5s'}}>
                <div className="w-2.5 h-2.5 bg-blue-200 rounded-full shadow-[0_0_18px_rgba(191,219,254,0.6)]"></div>
              </div>

              {/* Protective Blue Aura */}
              <div className="absolute bottom-16 right-20 animate-pulse" style={{animationDuration: '4s'}}>
                <div className="w-48 h-48 rounded-full bg-gradient-radial from-blue-400/20 to-transparent shadow-[0_0_60px_rgba(59,130,246,0.4)]"></div>
              </div>

              {/* Blue Energy Rings */}
              <div className="absolute bottom-32 right-28 animate-spin" style={{animationDuration: '8s'}}>
                <div className="w-32 h-32 rounded-full border-2 border-blue-400/40 border-dashed"></div>
              </div>
              <div className="absolute bottom-20 right-36 animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}>
                <div className="w-24 h-24 rounded-full border border-blue-300/30 border-dotted"></div>
              </div>

              {/* Sparkling Effects */}
              <div className="absolute top-20 right-20 animate-bounce" style={{animationDuration: '1.5s'}}>
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-blue-400">
                  <div className="absolute -top-1 -left-2 w-0 h-0 border-l-2 border-r-2 border-t-3 border-l-transparent border-r-transparent border-t-blue-400"></div>
                </div>
              </div>
              <div className="absolute bottom-48 right-44 animate-bounce" style={{animationDuration: '1.8s', animationDelay: '0.3s'}}>
                <div className="w-0 h-0 border-l-1.5 border-r-1.5 border-b-2.5 border-l-transparent border-r-transparent border-b-blue-300">
                  <div className="absolute -top-0.5 -left-1.5 w-0 h-0 border-l-1.5 border-r-1.5 border-t-2.5 border-l-transparent border-r-transparent border-t-blue-300"></div>
                </div>
              </div>

              {/* Floating Blue Geometric Shapes */}
              <div className="absolute top-40 right-48 animate-float" style={{animationDuration: '3s'}}>
                <div className="w-6 h-6 bg-blue-400/60 transform rotate-45 shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
              </div>
              <div className="absolute bottom-36 right-52 animate-float" style={{animationDuration: '4s', animationDelay: '1s'}}>
                <div className="w-4 h-4 bg-blue-300/50 rounded-full shadow-[0_0_10px_rgba(147,197,253,0.4)]"></div>
              </div>

              {/* Blue Light Rays */}
              <div className="absolute bottom-24 right-24 opacity-60">
                <div className="w-1 h-16 bg-gradient-to-t from-blue-400/0 to-blue-400/80 transform rotate-12"></div>
              </div>
              <div className="absolute bottom-32 right-40 opacity-50">
                <div className="w-0.5 h-12 bg-gradient-to-t from-blue-300/0 to-blue-300/70 transform -rotate-6"></div>
              </div>
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

      {/* Section 4: Contact Information */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">ช่องทางติดต่อ</h2>
            <p className="text-muted-foreground">
              สอบถามข้อมูลเพิ่มเติมหรือขอความช่วยเหลือ
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  โทรศัพท์
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">02-881-1888</p>
                <p className="text-sm text-muted-foreground">จันทร์ - ศุกร์ 8:30 - 17:30</p>
                <p className="text-sm text-muted-foreground">เสาร์ 9:00 - 15:00</p>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  อีเมล
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">info@ancbroker.com</p>
                <p className="text-sm text-muted-foreground">ตอบกลับภายใน 24 ชั่วโมง</p>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  ที่อยู่
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">บริษัท เอ เอ็น ซี โบรกเกอร์เรจ จำกัด</p>
                <p className="text-sm text-muted-foreground">126/5 ถนนสิรินธร แขวงบางพลัด เขตบางพลัด กรุงเทพฯ 10700</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 ANC Insurtech Co., Ltd. | ประกันอุบัติเหตุสำหรับบุคลากรและญาติ</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;