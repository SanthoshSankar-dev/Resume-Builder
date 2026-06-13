import { ResumeData, TemplateType } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Award, Briefcase, GraduationCap, Code, User } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  switch (template) {
    case 'minimal':
      return <MinimalTemplate data={data} />;
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'executive':
      return <ExecutiveTemplate data={data} />;
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'elegant':
      return <ElegantTemplate data={data} />;
    default:
      return <ProfessionalTemplate data={data} />;
  }
};

// ============ MINIMAL TEMPLATE ============
const MinimalTemplate = ({ data }: { data: ResumeData }) => {
  const { personalDetails, summary, education, experience, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 p-8 min-h-full font-sans text-[11px] leading-tight" id="resume-content">
      {/* Header */}
      <header className="text-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
          {personalDetails.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-[10px]">
          {personalDetails.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {personalDetails.email}
            </span>
          )}
          {personalDetails.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {personalDetails.phone}
            </span>
          )}
          {personalDetails.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {personalDetails.location}
            </span>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-[10px] mt-1">
          {personalDetails.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {personalDetails.linkedin}
            </span>
          )}
          {personalDetails.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3" />
              {personalDetails.github}
            </span>
          )}
          {personalDetails.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {personalDetails.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-[10px] text-gray-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 text-[10px] mb-1">{exp.company} • {exp.location}</p>
                {exp.description && <p className="text-gray-700 mb-1">{exp.description}</p>}
                {exp.achievements.length > 0 && exp.achievements[0] && (
                  <ul className="list-disc ml-4 text-gray-700 space-y-0.5">
                    {exp.achievements.filter(a => a).map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600 text-[10px]">{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-500 text-[10px]">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-[10px] text-gray-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="space-y-1">
            {skills.technical.length > 0 && (
              <p><span className="font-semibold">Technical:</span> {skills.technical.join(', ')}</p>
            )}
            {skills.soft.length > 0 && (
              <p><span className="font-semibold">Soft Skills:</span> {skills.soft.join(', ')}</p>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-gray-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-gray-500 text-[10px]">Tech: {project.technologies.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span><span className="font-semibold">{cert.name}</span> – {cert.issuer}</span>
                <span className="text-[10px] text-gray-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// ============ PROFESSIONAL TEMPLATE ============
const ProfessionalTemplate = ({ data }: { data: ResumeData }) => {
  const { personalDetails, summary, education, experience, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 min-h-full font-sans text-[11px] leading-tight" id="resume-content">
      {/* Header */}
      <header className="bg-[#1e3a5f] text-white p-5">
        <h1 className="text-xl font-bold mb-2 tracking-tight">
          {personalDetails.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-white/90 text-[10px]">
          {personalDetails.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              {personalDetails.email}
            </span>
          )}
          {personalDetails.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              {personalDetails.phone}
            </span>
          )}
          {personalDetails.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {personalDetails.location}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-white/90 text-[10px] mt-1">
          {personalDetails.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3 h-3" />
              {personalDetails.linkedin}
            </span>
          )}
          {personalDetails.github && (
            <span className="flex items-center gap-1.5">
              <Github className="w-3 h-3" />
              {personalDetails.github}
            </span>
          )}
          {personalDetails.portfolio && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              {personalDetails.portfolio}
            </span>
          )}
        </div>
      </header>

      <div className="p-5">
        {/* Summary */}
        {summary && (
          <section className="mb-4">
            <h2 className="text-xs font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2 uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2 uppercase tracking-wide">
              Work Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-[10px] text-white bg-[#1e3a5f] px-2 py-0.5 rounded">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[#1e3a5f] font-medium text-[10px]">{exp.company} | {exp.location}</p>
                  {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
                  {exp.achievements.length > 0 && exp.achievements[0] && (
                    <ul className="list-disc ml-4 text-gray-700 mt-1 space-y-0.5">
                      {exp.achievements.filter(a => a).map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-[#1e3a5f] font-medium text-[10px]">{edu.institution}</p>
                    {edu.gpa && <p className="text-gray-500 text-[10px]">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-[10px] text-white bg-[#1e3a5f] px-2 py-0.5 rounded">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <section className="mb-4">
            <h2 className="text-xs font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2 uppercase tracking-wide">
              Skills
            </h2>
            <div className="space-y-1">
              {skills.technical.length > 0 && (
                <p><span className="font-semibold text-[#1e3a5f]">Technical:</span> {skills.technical.join(' • ')}</p>
              )}
              {skills.soft.length > 0 && (
                <p><span className="font-semibold text-[#1e3a5f]">Soft Skills:</span> {skills.soft.join(' • ')}</p>
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2 uppercase tracking-wide">
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-[#1e3a5f] text-[10px] mt-0.5">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-2 uppercase tracking-wide">
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span><span className="font-semibold">{cert.name}</span> – {cert.issuer}</span>
                  <span className="text-[10px] text-gray-500">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// ============ CREATIVE TEMPLATE ============
const CreativeTemplate = ({ data }: { data: ResumeData }) => {
  const { personalDetails, summary, education, experience, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 min-h-full font-sans text-[11px] leading-tight" id="resume-content">
      <div className="flex min-h-full">
        {/* Sidebar */}
        <aside className="w-[35%] bg-gradient-to-b from-[#2d3748] to-[#1a202c] text-white p-4">
          <div className="mb-5">
            <h1 className="text-lg font-bold mb-1 leading-tight">
              {personalDetails.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact */}
          <div className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400 flex items-center gap-1">
              <User className="w-3 h-3" /> Contact
            </h2>
            <div className="space-y-1.5 text-[10px]">
              {personalDetails.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-3 h-3 mt-0.5 text-gray-400 flex-shrink-0" />
                  <span className="break-all">{personalDetails.email}</span>
                </div>
              )}
              {personalDetails.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span>{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span>{personalDetails.location}</span>
                </div>
              )}
              {personalDetails.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin className="w-3 h-3 mt-0.5 text-gray-400 flex-shrink-0" />
                  <span className="break-all">{personalDetails.linkedin}</span>
                </div>
              )}
              {personalDetails.github && (
                <div className="flex items-start gap-2">
                  <Github className="w-3 h-3 mt-0.5 text-gray-400 flex-shrink-0" />
                  <span className="break-all">{personalDetails.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {(skills.technical.length > 0 || skills.soft.length > 0) && (
            <div className="mb-5">
              <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400 flex items-center gap-1">
                <Code className="w-3 h-3" /> Skills
              </h2>
              {skills.technical.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-[9px] font-semibold mb-1 text-gray-300">Technical</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.technical.map((skill, idx) => (
                      <span key={idx} className="bg-white/10 px-1.5 py-0.5 rounded text-[9px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <h3 className="text-[9px] font-semibold mb-1 text-gray-300">Soft Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.soft.map((skill, idx) => (
                      <span key={idx} className="bg-white/10 px-1.5 py-0.5 rounded text-[9px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400 flex items-center gap-1">
                <GraduationCap className="w-3 h-3" /> Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[10px] font-semibold">{edu.degree}</h3>
                    <p className="text-[9px] text-gray-300">{edu.field}</p>
                    <p className="text-[9px] text-gray-400">{edu.institution}</p>
                    <p className="text-[9px] text-gray-500">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-5">
          {/* Summary */}
          {summary && (
            <section className="mb-4">
              <h2 className="text-xs font-bold text-[#2d3748] mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#2d3748]"></span>
                ABOUT ME
              </h2>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold text-[#2d3748] mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#2d3748]"></span>
                EXPERIENCE
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 border-[#2d3748]/30">
                    <div className="absolute w-2 h-2 bg-[#2d3748] rounded-full -left-[5px] top-1"></div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-[#2d3748] font-medium text-[10px]">{exp.company}</p>
                    <p className="text-[10px] text-gray-500">
                      {exp.location} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
                    {exp.achievements.length > 0 && exp.achievements[0] && (
                      <ul className="list-disc ml-4 text-gray-700 mt-1 space-y-0.5">
                        {exp.achievements.filter(a => a).map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold text-[#2d3748] mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#2d3748]"></span>
                PROJECTS
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 rounded p-2">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 text-[10px]">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="bg-[#2d3748]/10 text-[#2d3748] px-1.5 py-0.5 rounded text-[9px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-[#2d3748] mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#2d3748]"></span>
                CERTIFICATIONS
              </h2>
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <span><span className="font-semibold">{cert.name}</span> – {cert.issuer}</span>
                    <span className="text-[10px] text-gray-500">{cert.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

// ============ EXECUTIVE TEMPLATE ============
const ExecutiveTemplate = ({ data }: { data: ResumeData }) => {
  const { personalDetails, summary, education, experience, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 min-h-full font-serif text-[11px] leading-tight" id="resume-content">
      {/* Elegant Header */}
      <header className="text-center py-6 border-b-2 border-[#8b7355]">
        <h1 className="text-2xl font-bold text-[#2c2c2c] tracking-wide mb-2 uppercase">
          {personalDetails.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center items-center gap-3 text-[10px] text-gray-600 flex-wrap">
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <><span className="text-[#8b7355]">|</span><span>{personalDetails.phone}</span></>}
          {personalDetails.location && <><span className="text-[#8b7355]">|</span><span>{personalDetails.location}</span></>}
        </div>
        <div className="flex justify-center items-center gap-3 text-[10px] text-gray-600 mt-1 flex-wrap">
          {personalDetails.linkedin && <span>{personalDetails.linkedin}</span>}
          {personalDetails.github && <><span className="text-[#8b7355]">|</span><span>{personalDetails.github}</span></>}
        </div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold text-[#8b7355] mb-2 tracking-widest uppercase text-center">
              Executive Profile
            </h2>
            <p className="text-gray-700 leading-relaxed text-center italic">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold text-[#8b7355] mb-3 tracking-widest uppercase text-center border-b border-[#8b7355]/30 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[#2c2c2c] uppercase tracking-wide">{exp.position}</h3>
                    <span className="text-[10px] text-[#8b7355] font-medium">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[#8b7355] font-semibold text-[10px] mb-1">{exp.company}, {exp.location}</p>
                  {exp.description && <p className="text-gray-700">{exp.description}</p>}
                  {exp.achievements.length > 0 && exp.achievements[0] && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.achievements.filter(a => a).map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#8b7355] mt-0.5">▸</span>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-[#8b7355] mb-2 tracking-widest uppercase border-b border-[#8b7355]/30 pb-1">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-[#2c2c2c]">{edu.degree}</h3>
                    <p className="text-[10px] text-gray-600">{edu.field}</p>
                    <p className="text-[10px] text-[#8b7355]">{edu.institution}</p>
                    <p className="text-[10px] text-gray-500">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-[#8b7355] mb-2 tracking-widest uppercase border-b border-[#8b7355]/30 pb-1">
                Certifications
              </h2>
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <span className="font-semibold text-[#2c2c2c]">{cert.name}</span>
                    <p className="text-[10px] text-gray-600">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <section className="mt-5">
            <h2 className="text-xs font-bold text-[#8b7355] mb-2 tracking-widest uppercase text-center border-b border-[#8b7355]/30 pb-1">
              Core Competencies
            </h2>
            <div className="text-center">
              {skills.technical.length > 0 && (
                <p className="text-gray-700">{skills.technical.join(' • ')}</p>
              )}
              {skills.soft.length > 0 && (
                <p className="text-gray-600 mt-1">{skills.soft.join(' • ')}</p>
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mt-5">
            <h2 className="text-xs font-bold text-[#8b7355] mb-2 tracking-widest uppercase text-center border-b border-[#8b7355]/30 pb-1">
              Key Projects
            </h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-[#2c2c2c]">{project.name}</h3>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// ============ MODERN TEMPLATE ============
const ModernTemplate = ({ data }: { data: ResumeData }) => {
  const { personalDetails, summary, education, experience, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 min-h-full font-sans text-[11px] leading-tight" id="resume-content">
      {/* Modern Header with Gradient Accent */}
      <header className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]"></div>
        <div className="p-5 pt-4">
          <h1 className="text-xl font-black text-gray-900 tracking-tight">
            {personalDetails.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-3 mt-2 text-[10px]">
            {personalDetails.email && (
              <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                <Mail className="w-3 h-3 text-[#6366f1]" />
                {personalDetails.email}
              </span>
            )}
            {personalDetails.phone && (
              <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                <Phone className="w-3 h-3 text-[#8b5cf6]" />
                {personalDetails.phone}
              </span>
            )}
            {personalDetails.location && (
              <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                <MapPin className="w-3 h-3 text-[#ec4899]" />
                {personalDetails.location}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-1 text-[10px]">
            {personalDetails.linkedin && (
              <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                <Linkedin className="w-3 h-3 text-[#6366f1]" />
                {personalDetails.linkedin}
              </span>
            )}
            {personalDetails.github && (
              <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                <Github className="w-3 h-3 text-[#8b5cf6]" />
                {personalDetails.github}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="p-5 pt-0">
        {/* Summary */}
        {summary && (
          <section className="mb-4 bg-gradient-to-r from-[#6366f1]/5 to-[#ec4899]/5 p-3 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-4">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-4">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#6366f1]" />
                  EXPERIENCE
                </h2>
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-[#6366f1] pl-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <span className="text-[9px] text-[#6366f1] font-medium">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-[#8b5cf6] font-medium text-[10px]">{exp.company} • {exp.location}</p>
                      {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
                      {exp.achievements.length > 0 && exp.achievements[0] && (
                        <ul className="mt-1 space-y-0.5">
                          {exp.achievements.filter(a => a).map((achievement, idx) => (
                            <li key={idx} className="text-gray-700 flex items-start gap-1">
                              <span className="text-[#ec4899]">→</span> {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  PROJECTS
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded p-2">
                      <h3 className="font-bold text-gray-900 text-[10px]">{project.name}</h3>
                      <p className="text-gray-600 text-[9px]">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="bg-[#6366f1]/10 text-[#6366f1] px-1 py-0.5 rounded text-[8px]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Skills */}
            {(skills.technical.length > 0 || skills.soft.length > 0) && (
              <section>
                <h2 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-[#ec4899]" />
                  SKILLS
                </h2>
                {skills.technical.length > 0 && (
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-1">
                      {skills.technical.map((skill, idx) => (
                        <span key={idx} className="bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 text-gray-700 px-1.5 py-0.5 rounded text-[9px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {skills.soft.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {skills.soft.map((skill, idx) => (
                      <span key={idx} className="bg-[#ec4899]/10 text-gray-600 px-1.5 py-0.5 rounded text-[9px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#6366f1]" />
                  EDUCATION
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900 text-[10px]">{edu.degree}</h3>
                      <p className="text-[9px] text-gray-600">{edu.field}</p>
                      <p className="text-[9px] text-[#6366f1]">{edu.institution}</p>
                      <p className="text-[9px] text-gray-400">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  CERTIFICATIONS
                </h2>
                <div className="space-y-1">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <p className="font-semibold text-gray-900 text-[10px]">{cert.name}</p>
                      <p className="text-[9px] text-gray-500">{cert.issuer} • {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ ELEGANT TEMPLATE ============
const ElegantTemplate = ({ data }: { data: ResumeData }) => {
  const { personalDetails, summary, education, experience, skills, projects, certifications } = data;

  return (
    <div className="bg-[#faf9f6] text-gray-900 min-h-full font-serif text-[11px] leading-tight" id="resume-content">
      {/* Elegant Minimal Header */}
      <header className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-light text-[#2c2c2c] tracking-[0.3em] uppercase text-center">
          {personalDetails.fullName || 'Your Name'}
        </h1>
        <div className="w-16 h-px bg-[#c9a961] mx-auto my-3"></div>
        <div className="flex justify-center items-center gap-4 text-[10px] text-gray-500 flex-wrap">
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>•</span>}
          {personalDetails.phone && <span>{personalDetails.phone}</span>}
          {personalDetails.location && <span>•</span>}
          {personalDetails.location && <span>{personalDetails.location}</span>}
        </div>
        <div className="flex justify-center items-center gap-4 text-[10px] text-gray-500 mt-1 flex-wrap">
          {personalDetails.linkedin && <span>{personalDetails.linkedin}</span>}
          {personalDetails.github && <span>•</span>}
          {personalDetails.github && <span>{personalDetails.github}</span>}
        </div>
      </header>

      <div className="px-6 pb-6">
        {/* Summary */}
        {summary && (
          <section className="mb-5">
            <h2 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c9a961] mb-2 text-center">
              Profile
            </h2>
            <p className="text-gray-600 leading-relaxed text-center max-w-lg mx-auto">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c9a961] mb-3 text-center">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-center">
                  <h3 className="font-semibold text-[#2c2c2c] uppercase tracking-wide">{exp.position}</h3>
                  <p className="text-[#c9a961] text-[10px]">{exp.company} | {exp.location}</p>
                  <p className="text-[10px] text-gray-400 italic mb-1">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && <p className="text-gray-600 max-w-md mx-auto">{exp.description}</p>}
                  {exp.achievements.length > 0 && exp.achievements[0] && (
                    <div className="mt-1 max-w-md mx-auto text-left">
                      {exp.achievements.filter(a => a).map((achievement, idx) => (
                        <p key={idx} className="text-gray-600 flex items-start gap-2">
                          <span className="text-[#c9a961]">◆</span> {achievement}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c9a961] mb-2 text-center">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h3 className="font-semibold text-[#2c2c2c]">{edu.degree} in {edu.field}</h3>
                    <p className="text-[10px] text-[#c9a961]">{edu.institution}</p>
                    <p className="text-[10px] text-gray-400">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {(skills.technical.length > 0 || skills.soft.length > 0) && (
            <section>
              <h2 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c9a961] mb-2 text-center">
                Expertise
              </h2>
              <div className="text-center">
                {skills.technical.length > 0 && (
                  <p className="text-gray-600">{skills.technical.join(' · ')}</p>
                )}
                {skills.soft.length > 0 && (
                  <p className="text-gray-500 mt-1">{skills.soft.join(' · ')}</p>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mt-5">
            <h2 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c9a961] mb-2 text-center">
              Notable Projects
            </h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id} className="text-center">
                  <h3 className="font-semibold text-[#2c2c2c]">{project.name}</h3>
                  <p className="text-gray-600 text-[10px] max-w-md mx-auto">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-[9px] text-[#c9a961] mt-0.5">{project.technologies.join(' · ')}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mt-5">
            <h2 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c9a961] mb-2 text-center">
              Certifications
            </h2>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {certifications.map((cert) => (
                <span key={cert.id} className="text-gray-600">
                  {cert.name} <span className="text-gray-400">({cert.issuer})</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
