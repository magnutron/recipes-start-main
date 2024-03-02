export default function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      <p>Send us a message</p>
      <form>
        <input type="text" placeholder="Your name" />
        <br></br>
        <input type="email" placeholder="Your email" />
        <br></br>
        <textarea placeholder="Your message" />
        <br></br>
        <button
          type="submit"
          onClick={() => {
            console.log("Well, now Contact exists. It may not be functional, but it exists.");
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
