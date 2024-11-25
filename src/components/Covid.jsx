// src/pages/COVID19Info.js
import React from 'react';

const COVID19Info = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">COVID-19 Information</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          COVID-19 is a respiratory illness caused by the coronavirus SARS-CoV-2. It spreads primarily through respiratory droplets when an infected person coughs, sneezes, or talks. Symptoms can range from mild to severe, including fever, cough, shortness of breath, fatigue, and loss of taste or smell. In severe cases, it can lead to pneumonia or acute respiratory distress.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Precautions</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Wear a mask in crowded or indoor settings to reduce the spread of respiratory droplets.</li>
          <li>Maintain a physical distance of at least 6 feet (2 meters) from others.</li>
          <li>Wash your hands frequently with soap and water for at least 20 seconds.</li>
          <li>Use an alcohol-based hand sanitizer if soap and water are not available.</li>
          <li>Avoid touching your face, especially your eyes, nose, and mouth.</li>
          <li>Cover your mouth and nose with a tissue or elbow when coughing or sneezing.</li>
          <li>Regularly clean and disinfect frequently touched surfaces.</li>
          <li>Get vaccinated and stay up to date with booster doses if recommended.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Common Medicines and Treatments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Medicine/Tablet</th>
                <th className="py-2 px-4 border-b">Usage</th>
                <th className="py-2 px-4 border-b">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">Paracetamol (Tylenol)</td>
                <td className="py-2 px-4 border-b">Fever and pain relief</td>
                <td className="py-2 px-4 border-b">Commonly used to reduce fever.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">Ibuprofen (Advil)</td>
                <td className="py-2 px-4 border-b">Pain relief and inflammation</td>
                <td className="py-2 px-4 border-b">Use with caution; follow medical advice.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">Dexamethasone</td>
                <td className="py-2 px-4 border-b">Anti-inflammatory</td>
                <td className="py-2 px-4 border-b">Recommended for severe cases.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">Remdesivir</td>
                <td className="py-2 px-4 border-b">Antiviral</td>
                <td className="py-2 px-4 border-b">Used for hospitalized patients with severe symptoms.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">Molnupiravir</td>
                <td className="py-2 px-4 border-b">Antiviral</td>
                <td className="py-2 px-4 border-b">Used for mild to moderate cases.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">Zinc and Vitamin C</td>
                <td className="py-2 px-4 border-b">Immune support</td>
                <td className="py-2 px-4 border-b">Supplementary for mild symptoms.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">Favipiravir</td>
                <td className="py-2 px-4 border-b">Antiviral</td>
                <td className="py-2 px-4 border-b">For early-stage mild to moderate COVID-19.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">Ivermectin</td>
                <td className="py-2 px-4 border-b">Antiparasitic</td>
                <td className="py-2 px-4 border-b">Not widely recommended; consult with a healthcare provider.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Vaccines</h2>
        <p className="mb-4">
          Vaccination is the most effective way to protect against severe illness from COVID-19. Common vaccines include Pfizer-BioNTech, Moderna, and Johnson & Johnson. Ensure you are vaccinated and stay up to date with booster doses as recommended by health authorities.
        </p>
      </section>
    </div>
  );
};

export default COVID19Info;
