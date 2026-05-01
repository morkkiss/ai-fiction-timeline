# Faculty Accessibility Field Guide

**WCAG 2.1 Level AA — what it requires, what your tools check, and what you actually need to do.**

Prepared by Morgan Talty · Department of English, University of Maine · April 2026

Based on the DOJ Title II Final Rule (28 CFR Part 35, Subpart H) and UMS APL VI-G.

---


This is the long version. If you have an hour, skim Section 2 — three priorities that catch most failures. If you have a weekend, work through Section 5 (format-by-format checklists). If you teach with equations, jump to Section 5f; that's the hardest problem on the page.


UMaine has an official Title II page describing the obligation, the deadline, and the campus tools you've been pointed toward (Ally, Grackle, Kaltura). That's the policy layer. Those tools are useful, but none of them gives you a workflow for figuring out what's broken in your materials, what to fix first, and what still needs human judgment. That's what this guide is for.


Read what you need. Skip what you don't.


## Section 2. The three things that matter most


If you do nothing else, do these three. They're the most common failures and they affect students most directly. All three are WCAG Level A — the most basic level — and the ones cited most often in federal enforcement.


### Priority 1. Caption your videos.


Every pre-recorded video your students access — Brightspace, YouTube, Google Classroom, anywhere — needs synchronized captions. Auto-captions from YouTube or Zoom are a starting point, not a finish. They miss accents, dialect, background noise, technical vocabulary. You have to review and correct them.


MacWhisper (Mac) is what I use: drop in a video, get a .vtt or .srt caption file, edit, upload to wherever the video lives. Time depends on audio quality and how much editing the captions need.


> **Important:** auto-captions alone do not meet the legal standard. They must be reviewed and corrected.


### Priority 2. Add alt text to your images.


Every image in every document students touch needs a text description. Charts, diagrams, photos, graphs — all of them. Decorative images (borders, dividers) can be marked decorative so screen readers skip them.


In Word and PowerPoint: right-click the image and choose Edit Alt Text. In Google Docs and Slides: right-click → Alt text, or Cmd+Option+Y on Mac. In a PDF: you'll need Adobe Acrobat Pro or a tool like UPDF.


Good alt text describes what the image conveys, not what it looks like. "Bar chart showing enrollment declining 15% from 2020 to 2025" is useful. "Chart" or "image of a graph" is not.


### Priority 3. Use real heading styles.


Bold large text that looks like a heading is invisible to a screen reader. You have to use the actual Heading styles. In Word: select the text, click Heading 1/2/3 in the Styles panel. In Google Docs: Format → Paragraph styles → Heading 1/2/3.


Screen readers use headings to skim a document the way you do visually. Without them, your student hears your whole syllabus as one undifferentiated wall of text. This is one of the easiest fixes and one of the most commonly missed.


If you only do these three things, you've addressed the highest-risk material. You're not fully compliant, but you have a defensible triage story and you've fixed what affects students most.


## Section 3. What is and isn't your problem


This is your problem, if students use it for your course:

- PDFs you post on Brightspace or Google Classroom — including the ones you posted in 2019 that students still open.
- Word documents you send students — syllabi, handouts, assignment sheets.
- PowerPoint presentations — posted, emailed, or linked anywhere students can find them.
- Videos — Zoom recordings, YouTube uploads, anything embedded in a course.
- LMS pages — Brightspace or Google Classroom content pages you build.
- Course websites or syllabus pages — any web page you direct students to.
- Forms and quizzes — Google Forms, Qualtrics, anything students fill out.
- Audio without video — needs a transcript.
- Email attachments — if you email students a PDF or doc for course purposes, it has to be accessible.
- Google Workspace — Docs, Slides, Sheets, Forms. Using a different platform doesn't change the obligation.

Gray area — talk to CITL or the ADA Coordinator if you're unsure:

- Materials posted before April 2026 that you're still assigning. The "preexisting documents" exception does not protect material you're still using.
- Third-party content you've embedded. Publisher integrations are the institution's problem; YouTube videos you embed are yours.
- Live Zoom sessions. At minimum, enable auto-transcription. For students with accommodations, CART services may be required.
- Student-generated content on platforms you require (Padlet, Perusall, etc.). The platform must be accessible, and you should review what students post for obvious barriers.

Not your problem:

- Brightspace or Google Classroom's interface itself. That's IT and the vendor.
- Publisher database interfaces. If UMaine licensed it, UMaine is responsible.
- Zoom's platform interface. Your recordings and shared content are still yours.
- UMaine's main website. That's Marketing/Communications and IT.

## Section 4. What Ally checks (and what it misses)


Ally is the accessibility checker built into Brightspace. It scans uploaded files, gives each one a 0–100% score, and generates alternative formats for students (HTML, ePub, audio, electronic braille). It's a useful first-pass tool. It is not a compliance certification.


What Ally does check:

- Whether images have alt text (not whether the alt text is good).
- Heading structure — whether headings exist and are in order.
- Color contrast for text.
- Document structure in PDFs and Word files: tags, language, table headers.
- Whether a document title is set.

What Ally does not check:

- Alt text quality. "Chart" gets the same score as a real description.
- Link text quality. "Click here" or a bare URL passes.
- Video captions. It can detect that a YouTube video is embedded but can't tell you whether captions exist or are accurate.
- Keyboard navigation and focus order.
- Form labels and error handling.
- Math notation. LaTeX-rendered PDFs, MathType images, and equation screenshots are invisible to Ally.
- LMS-editor content (Brightspace pages and announcements) is only partially analyzed. Treat editor-created content as material that still needs manual review.

Why a 100% Ally score does not mean compliant: Ally covers an important subset of WCAG 2.1 AA, not all of it. A document with a perfect Ally score can still have serious accessibility failures Ally cannot detect. Ally's own documentation says: "Perfect! No accessibility issues are detected, but further improvements may still be possible. Some issues can only be discovered with knowledge and human review."


Use Ally as a starting point. Fix everything it flags. Then manually check what it can't see.


If you use Google Classroom:


Ally doesn't exist there. It only works inside Brightspace. If you teach through Google Classroom, you have no automated checker at all unless you install a third-party tool like Grackle. The legal requirement is the same regardless of platform; the tooling support is not.


## Section 5. Format-specific checklists


### 5a. PDF documents

- Was it created from Word or PowerPoint? Fix the source first, then re-export with accessibility tags enabled.
- Export with tags: Word → File → Save As → PDF → Options → check "Document structure tags for accessibility."
- Run an accessibility check. PAC 3 is free (access-for-all.ch). Adobe Acrobat Pro: Tools → Accessibility Check.
- Set a real document title (not blank, not "Untitled"): File → Properties → Description → Title.
- Every image needs alt text. In Acrobat, the Tags panel will show <Figure> with no /Alt for missing ones.
- All links must be descriptive. No raw URLs. No "click here."
- Tables must have header rows identified.
- UMS requires PDF/UA-1 conformance. Run PAC 3 specifically for PDF/UA.

Scanned and photocopied PDFs:


A scanned PDF is an image of a page. Screen readers see nothing. OCR is the first step but not the whole fix.

- Scan at 300 dpi minimum (400–600 for small text). Grayscale or color, not black-and-white.
- Run OCR: Acrobat Pro → Document → OCR Text Recognition. Or UPDF.
- After OCR, tag the document structure (headings, lists, tables). OCR alone produces an unstructured text dump.
- Add alt text to images, charts, diagrams.
- Set the reading order. Test with a screen reader to confirm content reads in sequence.
- Set the document language and title.

Handwritten annotations and degraded photocopies often scan poorly and need manual transcription. If the original can't be made accessible, provide a typed transcript as an equally effective alternative.


### 5b. Word documents

- Run Review → Check Accessibility. Fix every Error first, then Warnings.
- Open View → Navigation Pane. Every heading you intended should appear. If it's missing, you used bold instead of a Heading style.
- Every image has alt text: right-click → Edit Alt Text. Mark purely decorative images as decorative.
- Tables have header rows: Table Design → Header Row. Table Properties → Row → "Repeat as header row at top of each page."
- Document title is set: File → Info → Properties → Title.
- Don't use text boxes for layout. They break reading order.
- All links are descriptive: select text → Cmd+K (Mac) or Ctrl+K (Windows) → add URL.
- Exporting to PDF: always check "Document structure tags for accessibility" in the save dialog.

### 5c. PowerPoint presentations

- Run Review → Check Accessibility. Fix every Error.
- Every slide needs a unique title. Even slides you don't actually present need titles for screen reader navigation.
- Check reading order: Home → Arrange → Selection Pane. Screen readers read bottom-to-top in this list.
- Every image, chart, icon, SmartArt, and decorative graphic has alt text.
- No color-only information. If red = fail and green = pass, add text labels too.
- Exporting to PDF: check accessibility tags in the export dialog.
- If you distribute speaker notes, those need to follow the same standards.

### 5d. Google Docs, Slides, Sheets, Forms


Google Workspace has good accessibility features but no built-in checker comparable to Microsoft Office's. Grackle is the best-known add-on for checking Google Docs, Slides, and Sheets. Check current pricing before recommending it widely.


Google Docs:

- Same fundamentals as Word — heading styles, alt text, descriptive links, table headers, document title, language.
- Add alt text: right-click image → Alt text. Or select image → Cmd+Option+Y (Mac) / Ctrl+Alt+Y (Windows).
- Use Format → Paragraph styles for headings. Don't just make text big and bold.
- Install Grackle for automated checks. Without it, you're checking everything by hand.

Google Slides:

- Add alt text: click image → Image options → Alt text. Or Cmd+Option+Y.
- Every slide needs a title. Use the title placeholder, or add one via Insert → Text box and set as title.
- Check reading order: Arrange → Order. Screen readers process elements in object-list order.
- Install Grackle Slides for automated checking.

Google Sheets:

- Mark header rows clearly (bold, freeze).
- Avoid merged cells. Screen readers lose their place in merged tables.
- If the sheet contains charts, provide text descriptions of what the data shows.

Google Forms:

- Every question needs clear, descriptive text. Don't use an image as the only question content.
- Use section headers to organize long forms.
- Mark required fields clearly.
- Error messages must describe what went wrong, not just "invalid input."
- Avoid complex branching logic that can confuse assistive technology.
- Export results to Google Sheets — better screen-reader navigation than the Responses tab.

### 5e. Pre-recorded video

- Does it have captions? If not, stop and caption it before posting.
- Were the auto-captions reviewed and edited? Raw auto-captions don't comply.
- Are captions a separate track, not burned in? Students need to resize and customize.
- Non-speech audio is captioned: music cues, sound effects, ambient sounds that carry meaning. [applause], [phone ringing], [music fades].
- Visual-only content is described verbally: charts on screen, demonstrations, whiteboard text, anything you point at.
- Zoom recordings: download the .mp4, transcribe with MacWhisper, upload the corrected .vtt to the Zoom cloud recording.
- YouTube: edit captions in YouTube Studio, or upload an externally generated .srt file.

### 5f. Math and STEM notation


If you teach with equations, this is your hardest accessibility problem. There is no quick fix. Budget significant time.


The core issue: equation-heavy PDFs generated from LaTeX, MathType, or screenshots are not semantically accessible to screen readers out of the box. A student may hear little or no usable math unless you provide MathML, carefully authored descriptions, or another equivalent path.


Three workable options:

- HTML with MathML (best for web). Convert LaTeX to HTML using Pandoc, LaTeXML, or tex4ht. Embed equations as MathML. MathJax 4.0+ renders MathML and generates ARIA labels screen readers can interpret element by element. Modern screen readers (NVDA with MathCat, JAWS, VoiceOver) increasingly support MathML, though quality varies.
- Detailed alt text for every equation. "The integral from zero to infinity of e to the negative x squared dx equals the square root of pi over two." Labor-intensive, but meets the legal requirement for text alternatives.
- Equally effective alternative. Provide a companion document — an HTML version with MathML, or a plain-text document describing every equation. The alternative must give the student the same information at the same time.

> **Important:** equation-heavy PDFs without remediation create major barriers for screen reader users. Treat them as high-risk content, not as a minor formatting issue.


## Section 6. Platform-specific guidance


### 6a. Brightspace (with Ally)


Brightspace is UMaine's institutional LMS. Ally is built in and scans uploaded files. See Section 4 for what Ally catches and misses.

- Upload your files, then also review the pages you build in the Brightspace editor. Ally generates alternative formats for some editor content but doesn't fully check it.
- Use the Accessibility Score dashboard to prioritize your highest-traffic, lowest-scoring files.
- Enable alternative formats so students can download HTML, ePub, audio, or braille versions automatically.
- In the WYSIWYG editor, use the Format dropdown for headings (H2, H3, H4), not bold text.

### 6b. Google Classroom


Google publishes accessibility guidance for Classroom, but the content within Classroom is still your responsibility. The big difference from Brightspace is that there's no Ally-style dashboard or built-in checker.


If Google Classroom is your primary platform, you're doing significantly more manual work than a Brightspace user. The legal requirement is identical. The tooling support is not. That's not a criticism of your choice — it's a fact you have to plan for.

- Install Grackle (Google Workspace add-on) for Docs, Slides, and Sheets.
- Every document, slide deck, and form you share has to be checked manually or with Grackle before posting.
- In assignments, announcements, and class pages, use proper formatting in the editor — headings, lists, descriptive link text.
- If you link to a PDF, video, or external site, that linked content must be accessible too.
- Google Classroom doesn't generate alternative formats the way Ally does. If a student needs a different format, you provide it.

### 6c. Zoom


Live sessions:

- Enable auto-transcription: Settings → In Meeting → Automated captions. Best real-time option for most faculty.
- For students with accommodations needing higher accuracy, coordinate CART services through Student Accessibility Services.
- Describe visual content verbally — if you share a chart on screen, say what it shows. Don't assume everyone can see it.
- If important info is shared only in chat, post it somewhere accessible afterward (LMS, email).
- Test breakout rooms before relying on them. Accessibility features may not carry over.

Recordings:


Treat Zoom's automated captions as a draft. Zoom itself recommends manual captioners when a specific accuracy level is required.

- Download the .mp4, transcribe with MacWhisper or another tool.
- Review and correct the .vtt or .srt.
- Upload the corrected captions to the Zoom cloud recording (Edit → Captions) or alongside the video on the LMS.

### 6d. YouTube


YouTube auto-captions are machine-generated. YouTube itself says quality varies with accents, dialect, background noise, and pronunciation. Treat them as a draft you must review.

- Edit captions in YouTube Studio after uploading.
- Caption non-speech audio: [music], [applause], [phone ringing].
- If you embed someone else's video, you need a captioned version or a transcript. Embedding their uncaptioned video doesn't transfer responsibility to them.
- Unlisted videos need captions if students access them through your course.
- For better quality, transcribe externally with MacWhisper and upload the .srt rather than editing in YouTube's caption editor.

### 6e. Perusall and Hypothesis


Both publish accessibility documentation, and their annotation interfaces can be used accessibly. Your responsibility is still the source documents you assign.

- A scanned PDF assigned through Perusall is still an inaccessible scanned PDF. The platform doesn't fix your documents.
- Every document you assign must be accessible before you assign it.
- Perusall offers a dyslexia-friendly font and increased contrast.
- Hypothesis works as a browser overlay. The overlay is accessible, but the underlying page or document still has to be.

### 6f. Padlet


Padlet says its Board product is broadly WCAG AA compliant and documents keyboard navigation, screen reader support, and alt text. Your responsibility is still the content you and your students post.

- User-generated content is not automatically accessible. If students post images without descriptions, those images are invisible to screen readers.
- If you require students to post images, encourage them to add descriptions.
- A Padlet post with only an image is invisible to a screen reader.
- Share Padlets via link — the most accessible distribution.
- Don't use color alone to organize or categorize posts.

### 6g. Discord


Discord says it is working toward WCAG AA conformance. There's active accessibility work, but it's not where course-critical information should live.

- Voice-only channels exclude students who are deaf, hard of hearing, or who can't process audio in real time. Always provide text summaries.
- Emoji reactions without text aren't accessible. Use text to communicate, not just reactions.
- If you post images, add alt text or a description in the same message.
- Pin or thread important announcements. Fast-moving chat is hard for screen reader users to follow.
- Discord is fine as supplementary. It is not fine as the only place important course information lives. Cross-post critical info to your LMS or email.

### 6h. Canva


Canva's editor has a built-in Design Accessibility Tool that flags contrast, typography, and alt text issues. Useful, but not a full WCAG checker.


> **Important:** Canva says its PDFs are screen-reader readable, but text-heavy instructional PDFs still need manual testing before you hand them to students.

- Canva is appropriate for social graphics, posters, and visual material paired with accessible text elsewhere.
- For syllabi, assignment sheets, and long-form handouts, Word or Google Docs are the safer default — their accessibility workflows are more mature.
- If you must use Canva for instructional content, run its checker, export the PDF, and manually test it before distribution.

### 6i. WordPress course sites


WordPress can be WCAG 2.1 AA compliant if configured properly, but accessibility depends heavily on the theme and on your content.

- Run the WAVE browser extension (wave.webaim.org) on every page. Free. Shows errors visually overlaid on the live page.
- Tab through the entire page with keyboard only. No mouse. Can you reach every link, button, and form field?
- Use proper heading hierarchy — H1 for page title, H2 for sections, H3 for subsections. No skipped levels.
- Every image has alt text. Use alt="" (empty) for purely decorative images.
- All links have descriptive text. No "click here." No bare URLs.
- The HTML element should declare the correct language (for example, lang="en"). A common easy fix.
- Any documents linked from the site (PDFs, Word) must also be accessible.
- WordPress gives you full control and full responsibility. Not all plugins produce accessible output. Test interactive plugins with a keyboard and screen reader before relying on them.

### 6j. Email attachments


Course-related email attachments are covered by Title II. If you email a syllabus, assignment, reading, or anything students need for the course, that document has to be accessible.

- Check accessibility in the source app before attaching: Review → Check Accessibility in Word/PowerPoint, or Grackle in Google Docs.
- Use descriptive filenames: "Week3-Reading-Assignment.pdf," not "Document1.pdf."
- If the attachment might be inaccessible, summarize the key information in the email body.
- Consider posting to your LMS and linking from email rather than attaching. Easier to update and easier to track.

## Section 7. When you cannot make something accessible


The legal standard when the original cannot be made accessible is "equally effective alternative access" — an alternative that gives the student the same information, at the same time, with the same opportunity to participate.


Examples of equally effective alternatives:

- A complex infographic that resists alt text — provide a text document describing all the information it conveys.
- A video you didn't create and can't caption — provide a written transcript alongside it.
- A LaTeX PDF with equations — provide an HTML version with MathML, or a plain-text companion describing every equation.
- A third-party interactive tool that isn't accessible — provide an alternative assignment that achieves the same learning outcome.
- A scanned historical document that can't be cleanly OCR'd — provide a typed transcript.
- An audio recording — provide a transcript.

When to contact Student Accessibility Services:


If a student has an accommodation letter from SAS, the accommodations are legally binding. Contact SAS if you're unsure how to provide one, if it requires resources you don't have (such as professional CART services), or if you believe the requested accommodation fundamentally alters the nature of your course.


For general accessibility — making your course materials usable by everyone — you don't wait for an accommodation letter. Title II requires proactive compliance. The obligation exists whether or not any specific student has asked for it.


Document your effort:


Keep a simple log: date, original material, barrier, alternative provided, time spent. This is your evidence of good-faith effort if questions arise. Perfection isn't a realistic first step. Timely remediation, documentation, and equally effective alternatives matter.


## Section 8. Which tools check what


A short comparison:

- Ally (Brightspace): document structure in LMS-uploaded files. Institutional license. Brightspace only.
- Microsoft Accessibility Checker: Word, PowerPoint, Excel. Free, built in.
- Grackle: Google Docs, Slides, Sheets. Free basic / paid Pro tier.
- WAVE: any web page. Free browser extension (Chrome, Firefox).
- PAC 3: PDF/UA and WCAG compliance for PDFs. Free. Windows; runs on Mac via Wine.
- UPDF: PDF remediation and OCR. Free trial / paid tier.
- Adobe Acrobat Pro: PDF remediation and checking. Subscription.
- MacWhisper: audio and video transcription. Free trial / paid Pro. Mac only.
- YouTube Studio: caption editing. Free.
- Zoom: caption editing for recordings. Included.

What no automated tool can check:


These require human judgment. No tool replaces ten minutes spent reviewing your own content with a screen reader.

- Alt text quality — does the description actually convey the information?
- Caption accuracy — do the words match what was said?
- Reading order — does the content make sense when read linearly?
- Cognitive accessibility — is the content understandable, or dense jargon?
- Whether an alternative is truly "equally effective."
- Form usability with keyboard and screen reader.
- Math notation — is the equation described in a way that conveys mathematical meaning?

## Section 9. Frequently asked questions


Will I personally get in trouble if my materials aren't accessible?


Primary legal exposure usually sits with the institution, not with you acting alone. But that doesn't mean it bypasses you. If a complaint traces back to your course materials, you may face internal compliance pressure, required remediation, and workload consequences through your employment relationship.


Does this apply to material I posted before the deadline?


Yes, if students still use it. The law has a preexisting-documents exception, but it explicitly does not apply to documents "currently used to apply for, gain access to, or participate in the public entity's services, programs, or activities." If it's on your Brightspace or Google Classroom and students access it after April 24, 2026, it has to be compliant. "I posted it in 2019" isn't a defense if you're still assigning it.


Ally says my document score is improving. Am I done?


No. Ally scores document structure — tags, headings, alt text fields, language settings, and some other document-level items. It doesn't cover the full WCAG 2.1 AA standard. Ally cannot check keyboard access, focus order, color contrast in every context, audio description in videos, form error handling, math notation, or anything outside the LMS. A high Ally score can still hide serious failures.


My videos have auto-captions on YouTube or Zoom. Is that enough?


No. YouTube and Zoom both say so themselves. Zoom explicitly recommends a manual captioner when a specific accuracy level is required for accessibility or compliance. Use auto-captions as a draft and correct them.


I have 200 PDFs on Brightspace. Where do I start?


Triage by usage. Open your LMS and identify the 20 materials students touch most: syllabus, major assignments, primary readings. Fix those first. A document 30 students use weekly is higher risk than one archived from 2018 nobody opens. You cannot fix 200 documents in a month by yourself. Prioritize by traffic, not by anxiety.


The university gave a four-month notice and minimal support. Can I push back?


You can raise workload, support, and timeline concerns through AFUM. Accessibility compliance may be legally required, but the impact on faculty workload, training, and support is still a labor issue. Talk to your AFUM rep instead of assuming the rollout is the final word.


What if I just cannot get it all done in time?


Prioritize the materials students use most, keep a remediation log, and document any accessible alternative you provided. That isn't immunity from complaints, but it's far better than doing nothing and it shows a concrete remediation plan. What you cannot do is ignore the issue.


What's the difference between my responsibility and IT's?


If you created or uploaded it, it's yours. If UMaine bought or built it, it's theirs. Your PDFs, Word docs, videos, Brightspace pages, course sites — yours. The Brightspace platform, the quiz engine's interface, publisher integrations, the Zoom client — IT's.


I use Google Classroom, not Brightspace. Does Ally help me at all?


No. Ally only works inside Brightspace. If you teach through Google Classroom, you have no automated checker unless you install Grackle. Every document goes through manual or Grackle review. The legal requirement is the same regardless of platform.


My department uses LaTeX for everything. Are we in trouble?


Equation-heavy PDFs are high risk. Many LaTeX-generated PDFs don't expose math in a screen-reader-friendly way by default. You'll likely need HTML/MathML alternatives, carefully authored descriptions, or other math-specific remediation. See Section 5f.


A student hasn't complained. Do I still have to do this?


Yes. Title II requires proactive compliance, not reactive accommodation. The obligation exists whether or not anyone has complained. A student should not have to disclose a disability or file a complaint to access your course materials. The standard is "accessible by default," not "accessible upon request."


Can I just stop posting materials online?


Technically you can reduce what you share digitally, but it's a worse experience for everyone, and the university's own working group has flagged this as a sign of faculty desperation, not a solution. Taking content down rather than fixing it harms all students. If they still need the material, moving it offline doesn't eliminate the obligation — it just changes the format you have to provide.


I found an accessibility error on UMaine's own website. Is that my problem?


No. Institutional web properties belong to IT and Marketing/Communications. But document it and report it. Your documentation protects you if the institution ever claims it's fully compliant while its own pages aren't.


What about AI-generated content? Is it automatically accessible?


No. AI-generated text, images, documents, and presentations have the same accessibility requirements as anything else. If you use AI to create a handout, you still check heading structure, alt text, link text, and everything else. AI tools don't produce accessible output by default.


My colleague says they were told not to worry about it. Should I believe them?


No. The deadline is federal law. The DOJ Title II final rule was published in April 2024. UMS policy APL VI-G has been in effect since 2020. Whoever said "don't worry about it" was either misinformed, trying to reduce anxiety, or speaking for their department's risk tolerance. Your compliance is your responsibility regardless of what a colleague was told.


## Section 10. Where to get help

- UMaine System Title II Regulations: maine.edu/equal-opportunity/title-ii-regulations — official starting point for deadline, scope, baseline campus tools.
- CITL (Center for Innovation in Teaching and Learning): umaine.edu/citl — faculty support, accessible syllabus resources, Title II FAQ. Genuinely helpful.
- UMaine ADA Coordinator: Amanda Paradis, Chadbourne Hall 406, amanda.paradis1@maine.edu — formal accommodation questions, exemption process.
- UMS IT Accessibility: maine.edu/itaccessibility — policy documents, technical standards, training.
- AFUM: afum.info — for workload concerns. Your union is paying attention to accessibility workload.
- Student Accessibility Services: umaine.edu/studentaccessibility — accommodation letters, CART services, student-specific needs.
- WAVE: wave.webaim.org — free browser extension for any web page.
- WebAIM: webaim.org — free articles, tools, contrast checker, WCAG in plain language.
- Grackle: grackledocs.com — accessibility checker for Google Docs, Slides, Sheets.
- W3C WCAG Quick Reference: w3.org/WAI/WCAG21/quickref — the actual standard, filterable by level and topic.

Appendix A. Quick checklist by format

- PDF: alt text on images. Heading tags. Document title. Language set. PDF/UA (use PAC 3).
- Scanned PDF: OCR first (300+ dpi). Tag structure. Alt text. Reading order.
- Word: Review → Check Accessibility. Heading styles. Alt text. Table headers. No text boxes.
- PowerPoint: slide titles. Reading order (Selection Pane). Alt text. No color-only information.
- Google Docs: install Grackle. Heading styles. Alt text. Descriptive links. Document title.
- Google Slides: install Grackle Slides. Slide titles. Alt text. Reading order.
- Google Forms: clear question text. Section headers. Required fields marked. Useful error messages.
- Video: captions reviewed and corrected (not auto-only). Non-speech audio captioned. Visual content described.
- Math/LaTeX: HTML+MathML alternative, or detailed alt text for every equation.
- Web page: WAVE extension. Keyboard navigation. Headings. Alt text. lang="en". Descriptive links.
- Email attachment: check accessibility in the source app. Descriptive filename.
- Canva export: run Canva's checker, then test the exported PDF. For long-form handouts, prefer Word or Google Docs.

Appendix B. Glossary

- WCAG 2.1 AA: Web Content Accessibility Guidelines, version 2.1, Level AA. The technical standard the DOJ Title II rule requires.
- Title II (ADA): Title II of the Americans with Disabilities Act. Applies to state and local government, including public universities. Requires services, programs, and activities be accessible.
- Section 504: Section 504 of the Rehabilitation Act. Applies to entities receiving federal funding. UMaine is covered by both.
- Alt text: a text description of an image that screen readers read aloud. Should describe what the image conveys, not what it looks like.
- Screen reader: software that reads digital content aloud (JAWS, NVDA, VoiceOver, TalkBack). It can't see your content; it reads the underlying code and text.
- Heading hierarchy: structure of headings — H1 for the main title, H2 for sections, H3 for subsections. Must be in order; no skipping.
- Reading order: the sequence in which a screen reader encounters content. Word: text flow. PowerPoint: Selection Pane order. PDF: tag structure.
- OCR: Optical Character Recognition. Converts images of text (scans) into actual text screen readers can read.
- Captions vs. subtitles: captions include all audio — speech, speaker identification, sound effects, music. Subtitles are usually only spoken words. Accessibility requires captions.
- CART: Communication Access Realtime Translation. Professional service that provides highly accurate real-time captions, typically for live events.
- MathML / MathJax: MathML is a markup language for math notation in web content. MathJax renders MathML in browsers and makes it accessible to screen readers.
- PDF/UA: PDF/Universal Accessibility, an ISO standard for accessible PDFs. UMS requires PDF/UA-1.
- Ally: accessibility checker built into Brightspace. Scans uploaded files, gives scores, generates alternative formats. Doesn't work outside the LMS.
- Remediation: fixing accessibility issues in existing content. Can range from adding alt text (minutes) to restructuring a scanned PDF (hours).
- Equally effective alternative: when the original can't be made accessible, an alternative that provides the same information, at the same time, with the same opportunity to participate.

Appendix C. The legal minimum — what the law actually says

- Title II of the ADA (28 CFR Part 35, Subpart H): requires state and local government entities to ensure web content and mobile applications are accessible. Technical standard: WCAG 2.1 Level AA.
- DOJ final rule timeline: published April 24, 2024. Compliance deadline for entities serving 50,000+: April 24, 2026. UMaine falls in this category.
- Preexisting-content exception: limited exception for documents that existed before the deadline, but does NOT apply to content "currently used to apply for, gain access to, or participate in the public entity's services, programs, or activities." Anything still assigned after April 24, 2026 must be compliant.
- Equally effective alternative access: when direct access isn't possible, the entity must provide an alternative that gives an equally effective opportunity to participate. The fallback, not the default.
- UMS internal policy (APL VI-G): says campuses have overall responsibility for campus-related web content, and that individual employees and students are responsible for the accessibility of content they post on university and third-party sites that are part of a university program or activity. Accessibility is not only an IT responsibility.
- Enforcement: OCR investigates Section 504 complaints. DOJ can bring Title II actions. Section 504 allows private suits. Most university enforcement comes through OCR complaints filed by students or advocacy organizations.

This section is reference, not legal advice. For legal questions specific to your situation, consult the institution's Office of General Counsel or a qualified attorney.


Appendix D. Selected official references (reviewed April 2026)

- DOJ Title II web rule fact sheet: ada.gov/resources/2024-03-08-web-rule/
- UMS APL VI-G: maine.edu/apls/apl-vi-g/
- UMS Accessibility Policy & Standards: maine.edu/itaccessibility/policy/
- Anthology Ally alternative formats and FAQs: help.blackboard.com/Ally/
- Google Classroom screen reader guidance: support.google.com/edu/classroom/answer/9849192 and support.google.com/edu/classroom/answer/6084551
- Google Docs editors accessibility: support.google.com/accessibility/answer/16454276
- Zoom automated captions limitations: support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0062813
- YouTube automatic captions guidance: support.google.com/youtube/answer/6373554
- Hypothesis accessibility: web.hypothes.is/accessibility/
- Perusall accessibility statement: support.perusall.com/hc/en-us/articles/360033993894-Accessibility-statement
- Padlet accessibility: legal.padlet.com/accessibility
- Discord accessibility statement: discord.com/accessibility-statement
- Canva accessibility: canva.com/accessibility/

Platform behavior changes over time. Re-check vendor documentation before relying on any platform-specific claim.


Prepared by Morgan Talty.


Department of English, University of Maine.
