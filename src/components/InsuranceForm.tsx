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

const relationships = [
  "บิดา",
  "มารดา", 
  "คู่สมรส",
  "บุตร",
  "ผู้เกษียณอายุ",
  "อาจารย์พิเศษ"
];

const faculties = [
  "วิศวกรรมศาสตร์",
  "เทคโนโลยีสารสนเทศ",
  "วิทยาศาสตร์",
  "สถาปัตยกรรมศาสตร์",
  "วิทยาศาสตรการกีฬา",
  "บริหารธุรกิจ",
  "นวัตกรรมการออกแบบและสถาปัตยกรรม",
  "เทคโนโลยีการเกษตร"
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
      isExpanded: true
    }
  ]);
  const [showSummary, setShowSummary] = useState(false);
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
      isExpanded: true
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
      if (!person.beneficiary) personErrors.push('beneficiary');
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

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        variant: "destructive",
      });
      return;
    }

    setShowSummary(true);
  };

  const proceedToPayment = () => {
    // Simulate payment redirect
    toast({
      title: "กำลังดำเนินการ",
      description: "กำลังเปลี่ยนเส้นทางไปยังระบบชำระเงิน...",
    });
    
    // Simulate redirect delay
    setTimeout(() => {
      navigate('/success');
    }, 2000);
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
                          {age ? `อายุ ${age.years} ปี ${age.months} เดือน` : 'ไม่ระบุอายุ'} • {person.relationship}
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
            className="flex-1"
          >
            กลับไปแก้ไขข้อมูล
          </Button>
          <Button
            variant="default"
            size="xl"
            onClick={proceedToPayment}
            className="flex-1"
            style={{backgroundColor: '#4DCFFF', color: 'white'}}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            ไปชำระเงิน {totalPremium.toLocaleString()} บาท
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

                  {/* Beneficiary */}
                  <div>
                    <Label htmlFor={`beneficiary-${person.id}`}>ผู้รับประโยชน์ *</Label>
                    <Input
                      id={`beneficiary-${person.id}`}
                      value={person.beneficiary}
                      onChange={(e) => updatePerson(person.id, "beneficiary", e.target.value)}
                      placeholder="ชื่อผู้รับประโยชน์"
                      className={cn(validationErrors[person.id]?.includes('beneficiary') && "border-red-500 focus:border-red-500")}
                    />
                  </div>

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
          className="flex-1 py-6 text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          เพิ่มผู้เอาประกัน
        </Button>
        
        <Button
          size="xl"
          onClick={handleSubmit}
          className="flex-1 bg-[#75DAFF] hover:bg-[#75DAFF]/90 text-white py-6 text-lg"
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