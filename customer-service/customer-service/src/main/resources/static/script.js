const API_BASE_URL = "http://localhost:8082/customer"; // Cập nhật URL phù hợp nếu cần
let jwtToken = "";

// Đăng ký người dùng
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      alert("Registration successful!");
    } else {
      alert("Registration failed!");
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
});

// Đăng nhập người dùng
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_BASE_URL}/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      jwtToken = data.message;
      alert("Login successful!");
      document.getElementById("customerSection").style.display = "block";
    } else {
      alert("Invalid credentials!");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});

// Lấy danh sách khách hàng
document.getElementById("getCustomers").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const customers = await response.json();
      const customerList = document.getElementById("customerList");
      customerList.innerHTML = "";

      customers.forEach((customer) => {
        const li = document.createElement("li");
        li.textContent = `${customer.name} (${customer.email})`;
        customerList.appendChild(li);
      });
    } else {
      alert("Failed to fetch customers!");
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
});
