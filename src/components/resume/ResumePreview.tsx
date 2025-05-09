import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, PencilLine } from 'lucide-react';

interface ResumePreviewProps {
  templateId: string;
  resumeData: any;
  isAdmin?: boolean;
  onEditTemplate?: () => void;
}

export default function ResumePreview({
  templateId,
  resumeData,
  isAdmin = false,
  onEditTemplate,
}: ResumePreviewProps) {
  const handleDownload = () => {
    const jsPDF = require('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const marginLeft = 40;
    let y = 40;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(resumeData?.name || 'Your Name', marginLeft, y);
    y += 26;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(resumeData?.title || 'Professional Title', marginLeft, y);
    y += 22;

    doc.setFontSize(11);
    doc.setTextColor('#666');
    doc.text(
      [
        (resumeData?.email || 'email@example.com') +
          '   |   ' +
          (resumeData?.phone || '(123) 456-7890') +
          '   |   ' +
          (resumeData?.location || 'City, Country'),
      ],
      marginLeft,
      y
    );
    y += 24;

    doc.setTextColor('#262626');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', marginLeft, y);
    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const summary =
      resumeData?.summary ||
      'A brief summary of your qualifications and career goals...';
    const summarySplit = doc.splitTextToSize(summary, 500);
    doc.text(summarySplit, marginLeft, y);
    y += summarySplit.length * 16 + 10;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Experience', marginLeft, y);
    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const experienceList =
      resumeData?.experience || [
        {
          company: 'Company Name',
          position: 'Job Title',
          period: 'Jan 2020 - Present',
          description: 'Description of responsibilities and achievements',
        },
      ];
    experienceList.forEach((exp: any) => {
      doc.setFont('helvetica', 'bold');
      doc.text(exp.company, marginLeft, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${exp.position} (${exp.period})`, marginLeft + 5, y + 14);
      const desc = exp.description || '';
      const descSplit = doc.splitTextToSize(desc, 500);
      doc.text(descSplit, marginLeft + 10, y + 30);
      y += 30 + descSplit.length * 14;
    });
    y += 10;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Education', marginLeft, y);
    y += 18;
    const educationList =
      resumeData?.education || [
        {
          institution: 'University Name',
          degree: 'Degree Name',
          period: '2015 - 2019',
        },
      ];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    educationList.forEach((edu: any) => {
      doc.setFont('helvetica', 'bold');
      doc.text(edu.institution, marginLeft, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${edu.degree} (${edu.period})`, marginLeft + 5, y + 14);
      y += 32;
    });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Skills', marginLeft, y);
    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const skillsList =
      resumeData?.skills || ['Skill 1', 'Skill 2', 'Skill 3'];
    doc.text(skillsList.join(', '), marginLeft, y);

    doc.save('Resume.pdf');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold">Preview</h2>
        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex gap-2 items-center">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          {isAdmin && (
            <Button
              variant="outline"
              className="flex gap-2 items-center border border-primary"
              onClick={onEditTemplate}
            >
              <PencilLine className="h-4 w-4" />
              Edit Template
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto border rounded-lg bg-white dark:bg-gray-900 shadow-md">
        <div className="resume-paper scale-100 origin-top flex flex-col px-6 py-8 gap-6 min-h-[297mm] min-w-[210mm]">
          {!resumeData ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>
                Upload a resume or start editing to see the preview
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 max-w-[700px] mx-auto">
              <div className="flex flex-col items-center border-b pb-4 gap-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-resume-primary mb-1">
                  {resumeData.name || 'Your Name'}
                </h1>
                <p className="text-resume-accent text-lg font-medium mb-1">
                  {resumeData.title || 'Professional Title'}
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
                  <div>
                    <span className="font-medium">Email:</span> {resumeData.email || 'email@example.com'}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {resumeData.phone || '(123) 456-7890'}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {resumeData.location || 'City, Country'}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                <div className="md:col-span-2 flex flex-col gap-6">
                  <section>
                    <h2 className="text-xl font-bold text-resume-accent mb-1">Summary</h2>
                    <p className="text-gray-800 dark:text-gray-100">{resumeData.summary || 'A brief summary of your qualifications and career goals...'}</p>
                  </section>
                  <section>
                    <h2 className="text-xl font-bold text-resume-accent mb-1">Experience</h2>
                    {(resumeData.experience || [
                      {
                        company: 'Company Name',
                        position: 'Job Title',
                        period: 'Jan 2020 - Present',
                        description: 'Description of responsibilities and achievements'
                      }
                    ]).map((exp: any, index: number) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{exp.company}</h3>
                          <span className="text-xs text-gray-500">{exp.period}</span>
                        </div>
                        <p className="italic">{exp.position}</p>
                        <p className="text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </section>
                  <section>
                    <h2 className="text-xl font-bold text-resume-accent mb-1">Education</h2>
                    {(resumeData.education || [
                      {
                        institution: 'University Name',
                        degree: 'Degree Name',
                        period: '2015 - 2019',
                      }
                    ]).map((edu: any, index: number) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{edu.institution}</h3>
                          <span className="text-xs text-gray-500">{edu.period}</span>
                        </div>
                        <p className="italic">{edu.degree}</p>
                      </div>
                    ))}
                  </section>
                </div>
                <aside className="md:col-span-1 flex flex-col gap-4">
                  <section>
                    <h2 className="text-xl font-bold text-resume-accent mb-1">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {(resumeData.skills || ['Skill 1', 'Skill 2', 'Skill 3']).map((skill: string, index: number) => (
                        <span key={index} className="bg-resume-light text-resume-primary px-2 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
