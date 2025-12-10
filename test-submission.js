const formId = process.argv[2];

if (!formId) {
  console.error("Please provide a Form ID as an argument.");
  console.error("Usage: node test-submission.js <FORM_ID>");
  process.exit(1);
}

const url = `http://localhost:3000/api/submit/${formId}`;

const data = {
  email: "test@example.com",
  name: "Test User",
  message: "This is a test submission from the test script.",
  timestamp: new Date().toISOString()
};

console.log(`Sending submission to ${url}...`);

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then(async (res) => {
    const body = await res.text();
    console.log(`Status: ${res.status}`);
    try {
        console.log("Response:", JSON.parse(body));
    } catch {
        console.log("Response:", body);
    }
  })
  .catch((err) => {
    console.error("Error:", err);
  });
