import { Shield, Users, CheckCircle, Phone, Mail, MapPin, ArrowDown, Check } from "lucide-react";
import kmitlLogo from "@/assets/kmitl-logo.webp";
import ancLogo from "@/assets/anc-logo.svg";
import insurancePeopleBanner from "@/assets/insurance-people-banner.png";
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
      <section className="bg-gradient-to-r from-primary to-white text-foreground pt-12 pb-0 shadow-[var(--shadow-medium)] relative overflow-hidden">
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

            {/* Right Side - Image with Protection Graphics */}
            <div className="relative lg:flex hidden items-end justify-center h-full">
              {/* Background Protection Graphics - More Subtle */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Small Rectangle Shapes - Blue and Orange */}
                <div className="absolute top-12 left-20 w-8 h-12 bg-blue-400/30 rounded rotate-12 animate-fade-in"></div>
                <div className="absolute top-24 right-16 w-6 h-10 bg-orange-400/40 rounded rotate-45 animate-fade-in" style={{animationDelay: '0.1s'}}></div>
                <div className="absolute top-40 left-32 w-10 h-6 bg-blue-500/35 rounded -rotate-12 animate-fade-in" style={{animationDelay: '0.3s'}}></div>
                <div className="absolute top-56 right-28 w-7 h-9 bg-orange-500/45 rounded rotate-30 animate-fade-in" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-40 left-24 w-9 h-7 bg-blue-400/40 rounded rotate-45 animate-fade-in" style={{animationDelay: '0.7s'}}></div>
                <div className="absolute bottom-56 right-20 w-6 h-8 bg-orange-400/35 rounded -rotate-30 animate-fade-in" style={{animationDelay: '0.9s'}}></div>
                <div className="absolute bottom-72 left-40 w-8 h-6 bg-blue-500/30 rounded rotate-15 animate-fade-in" style={{animationDelay: '1.1s'}}></div>
                
                {/* Shield Icons scattered around - Balanced Visibility */}
                <div className="absolute top-8 left-8 animate-fade-in">
                  <Shield className="w-7 h-7 text-blue-400/50" strokeWidth={1.5} />
                </div>
                <div className="absolute top-16 right-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <Shield className="w-9 h-9 text-blue-500/45" strokeWidth={1.5} />
                </div>
                <div className="absolute top-32 left-16 animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <Shield className="w-6 h-6 text-blue-300/55" strokeWidth={1.5} />
                </div>
                <div className="absolute bottom-32 right-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
                  <Shield className="w-8 h-8 text-blue-400/50" strokeWidth={1.5} />
                </div>
                
                {/* Protective Circle Lines - Balanced */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-96 h-96 border border-blue-400/35 rounded-full animate-scale-in"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-80 h-80 border border-blue-500/30 rounded-full animate-scale-in" style={{animationDelay: '0.3s'}}></div>
                </div>
                
                {/* Coverage Grid Lines - Subtle */}
                <div className="absolute inset-0 opacity-25">
                  <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
                  <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
                  <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                  <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                </div>
                
                {/* Central Protection Glow - Subtle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-64 h-64 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
                </div>
              </div>
              
              {/* Main Image - Larger Size */}
              <div className="relative z-10 scale-110">
                <img 
                  src={insurancePeopleBanner} 
                  alt="ประกันอุบัติเหตุ - ผู้ป่วยที่มีความสุขและได้รับการดูแล" 
                  className="w-full h-auto object-contain drop-shadow-lg"
                />
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
                <p className="text-lg font-semibold">02-123-4567</p>
                <p className="text-sm text-muted-foreground">จันทร์-ศุกร์ 9:00-18:00 น.</p>
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
                <p className="text-lg font-semibold">info@ancinsurtech.com</p>
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
                <p className="text-sm">ANC Insurtech Co., Ltd.</p>
                <p className="text-sm text-muted-foreground">123 Technology Road, Innovation District, Bangkok 10110</p>
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