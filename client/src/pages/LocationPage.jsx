function LocationPage() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold">Our Location</h1>

      {/* Address */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Address</h2>
        <p>
          Rafflesia House <br />
          Gang Rafflesia II <br />
          Palembang, Indonesia
        </p>
      </div>

      {/* Map */}
      <div className="rounded overflow-hidden shadow">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.3739212935657!2d104.7788731!3d-2.9935426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b77000eb26751%3A0x7f4f22384f372ceb!2sRafflesia%20House!5e0!3m2!1sen!2sid!4v1774411230057!5m2!1sen!2sid"
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* CTA */}
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="mb-3">Want to visit or ask questions?</p>

        <a
          href="https://wa.me/6281349785960"
          target="_blank"
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Contact via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default LocationPage;
