const fs = require('fs');
const docPath = 'D:\\SIHPS2\\src\\app\\(applicant)\\applicant\\documents\\page.tsx';
let docContent = fs.readFileSync(docPath, 'utf8');

if (!docContent.includes('const [isUploading, setIsUploading]')) {
  docContent = docContent.replace(
    'export default function DocumentsPage() {',
    \`export default function DocumentsPage() {
  const [isUploading, setIsUploading] = React.useState(false);
  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      alert("Document uploaded successfully (Prototype)");
      setIsUploading(false);
    }, 1000);
  };\`);

  docContent = docContent.replace(
    '<button className="bg-white border border-slate-300 text-slate-700 shadow-sm px-6 py-2.5 rounded-lg font-bold hover:border-slate-400 transition-colors">',
    '<button onClick={handleUpload} className="bg-white border border-slate-300 text-slate-700 shadow-sm px-6 py-2.5 rounded-lg font-bold hover:border-slate-400 transition-colors">'
  );
  
  docContent = docContent.replace(
    'Browse Files',
    '{isUploading ? "Uploading..." : "Browse Files"}'
  );
  
  fs.writeFileSync(docPath, docContent, 'utf8');
}
console.log("Documents patched.");
