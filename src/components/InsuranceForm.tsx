import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
      faculty: ""
    }
  ]);
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
      faculty: ""
    };
    setPeople([...people, newPerson]);
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
  };

  const validateForm = () => {
    for (const person of people) {
      if (!person.firstName || !person.lastName || !person.birthDate || 
          !person.idNumber || !person.email || !person.beneficiary ||
          !person.referencePersonName || !person.relationship || 
          !person.major || !person.faculty) {
        return false;
      }
      if (person.idNumber.length !== 13 || !/^\d+$/.test(person.idNumber)) {
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(person.email)) {
        return false;
      }
    }
    return true;
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

  return (
    <div className="space-y-6">
      {people.map((person, index) => (
        <Card key={person.id} className="shadow-[var(--shadow-soft)]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                ผู้สมัครคนที่ {index + 1}
              </CardTitle>
              {people.length > 1 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removePerson(person.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`firstName-${person.id}`}>ชื่อ *</Label>
                <Input
                  id={`firstName-${person.id}`}
                  value={person.firstName}
                  onChange={(e) => updatePerson(person.id, "firstName", e.target.value)}
                  placeholder="กรอกชื่อ"
                />
              </div>
              <div>
                <Label htmlFor={`lastName-${person.id}`}>นามสกุล *</Label>
                <Input
                  id={`lastName-${person.id}`}
                  value={person.lastName}
                  onChange={(e) => updatePerson(person.id, "lastName", e.target.value)}
                  placeholder="กรอกนามสกุล"
                />
              </div>
            </div>

            {/* Birth Date */}
            <div>
              <Label>วันเดือนปีเกิด *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !person.birthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {person.birthDate ? (
                      <span>
                        {format(person.birthDate, "dd/MM/yyyy")}
                        {person.birthDate && (
                          (() => {
                            const age = calculateAge(person.birthDate);
                            return ` (อายุ ${age.years} ปี ${age.months} เดือน ${age.days} วัน)`;
                          })()
                        )}
                      </span>
                    ) : (
                      <span>เลือกวันเกิด</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={person.birthDate || undefined}
                    onSelect={(date) => updatePerson(person.id, "birthDate", date)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
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
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor={`email-${person.id}`}>อีเมล *</Label>
              <Input
                id={`email-${person.id}`}
                type="email"
                value={person.email}
                onChange={(e) => updatePerson(person.id, "email", e.target.value)}
                placeholder="example@email.com"
              />
            </div>

            {/* Beneficiary */}
            <div>
              <Label htmlFor={`beneficiary-${person.id}`}>ผู้รับประโยชน์ *</Label>
              <Input
                id={`beneficiary-${person.id}`}
                value={person.beneficiary}
                onChange={(e) => updatePerson(person.id, "beneficiary", e.target.value)}
                placeholder="ชื่อผู้รับประโยชน์"
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
              />
            </div>

            {/* Relationship */}
            <div>
              <Label>ความสัมพันธ์กับบุคลากร *</Label>
              <Select
                value={person.relationship}
                onValueChange={(value) => updatePerson(person.id, "relationship", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกความสัมพันธ์" />
                </SelectTrigger>
                <SelectContent>
                  {relationships.map((rel) => (
                    <SelectItem key={rel} value={rel}>
                      {rel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Major and Faculty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`major-${person.id}`}>สาขาวิชา *</Label>
                <Input
                  id={`major-${person.id}`}
                  value={person.major}
                  onChange={(e) => updatePerson(person.id, "major", e.target.value)}
                  placeholder="กรอกสาขาวิชา"
                />
              </div>
              <div>
                <Label>คณะ *</Label>
                <Select
                  value={person.faculty}
                  onValueChange={(value) => updatePerson(person.id, "faculty", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคณะ" />
                  </SelectTrigger>
                  <SelectContent>
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
        </Card>
      ))}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={addPerson}
          className="flex-1"
        >
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มผู้สมัครคนต่อไป
        </Button>
        
        <Button
          variant="premium"
          size="xl"
          onClick={handleSubmit}
          className="flex-1"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          ชำระเงิน ({people.length} คน)
        </Button>
      </div>
    </div>
  );
};

export default InsuranceForm;