async function testToken() {
  const room = "test-room";
  const username = "test-user";
  try {
    const res = await fetch(`http://localhost:3000/api/livekit/token?room=${room}&username=${username}`);
    const data = await res.json();
    console.log("Token Data:", data);
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}

testToken();
