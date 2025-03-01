function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        format: "a4",
        unit: "mm"
    });

    const name = document.getElementById("name").value;
    const executionDate = document.getElementById("executionDate").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const contractType = document.getElementById("contractType").value;
    const address = document.getElementById("address").value;
    const claimAmount = "INR " + document.getElementById("claimAmount").value;
    const state = document.getElementById("state").value;

    const content = `
    This ${contractType} will be started from ${executionDate} and will expire on ${expiryDate}.

    ${name} is selling his/her asset with an amount of ${claimAmount}. 
    Currently, ${name} is living at ${address}.

    This ${contractType} is enforceable only in the state of ${state}.
    `;

    let marginLeft = 20;
    let marginTop = 20;
    let maxWidth = 170;
    let lineSpacing = 8;
    let y = marginTop;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Contract Agreement", 40 + 40, y);
    y += 10;

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    let lines = doc.splitTextToSize(content, maxWidth);

    lines.forEach(line => {
        if (y > 280) {
            doc.addPage();
            y = marginTop;
        }
        doc.text(line, marginLeft, y);
        y += lineSpacing;
    });

    doc.save("Contract.pdf");
}