import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Success = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-medium)]">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              ขอบคุณสำหรับการสมัคร!
            </h1>
            <p className="text-muted-foreground">
              เราได้รับข้อมูลการสมัครประกันของท่านเรียบร้อยแล้ว
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-lg">
              <p>📧 อีเมลยืนยันจะถูกส่งไปยังที่อยู่อีเมลที่ท่านระบุ</p>
              <p>📋 เอกสารประกันจะถูกดำเนินการภายใน 3-5 วันทำการ</p>
            </div>

            <Button asChild variant="outline" className="w-full">
              <a href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับสู่หน้าหลัก
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;