// src/app/contato/page.tsx

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { sendContactRequest } from "@/lib/data";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    state: "",
    city: "",
  });

  const states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES",
    "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR",
    "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
    "SP", "SE", "TO",
  ];

  const [cities, setCities] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: string;
    text: string;
  } | null>(null);

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uf = e.target.value;

    setFormData((prev) => ({
      ...prev,
      state: uf,
      city: "",
    }));

    if (!uf) {
      setCities([]);
      return;
    }

    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      );

      const data = await response.json();
      const cityNames = data.map((item: any) => item.nome);
      cityNames.sort((a: string, b: string) => a.localeCompare(b));

      setCities(cityNames);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      setCities([]);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 10) {
      return numbers
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 14);
    } else {
      return numbers
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        phone: formatPhone(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const contactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      state: formData.state,
      city: formData.city,
      message: formData.message || undefined,
    };

    try {
      const response = await sendContactRequest(contactData);
      if (response.status >= 200 && response.status < 300) {
        setSubmitMessage({
          type: "success",
          text: response.message || "Mensagem enviada com sucesso!",
        });
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
          state: "",
          city: "",
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: response.message || "Erro ao enviar mensagem.",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setSubmitMessage({
        type: "error",
        text: "Ocorreu um erro inesperado ao enviar a mensagem.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-pf-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-12 text-pf-white">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-pf-yellow mb-8 text-center">
          Deixe sua mensagem para a ProtonFit
        </h1>

        {submitMessage && (
          <div
            className={`p-4 rounded-md mb-6 text-center ${submitMessage.type === "success" ? "bg-green-500" : "bg-red-500"}`}
          >
            {submitMessage.text}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulário de Dados do Cliente */}
          <div className="w-full bg-pf-black p-6 rounded-lg shadow-lg border border-pf-gray">
            <h2 className="text-2xl font-display font-bold mb-6">Seus Dados</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow focus:border-transparent outline-none text-pf-white"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-1"
                >
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow focus:border-transparent outline-none text-pf-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow focus:border-transparent outline-none text-pf-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Telefone ou Celular
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(21) 99999-9999"
                    required
                    className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow focus:border-transparent outline-none text-pf-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium mb-1"
                  >
                    Estado
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    required
                    className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow outline-none text-pf-white"
                  >
                    <option value="">Selecione o estado</option>
                    {states.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </div>
                  <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium mb-1"
                  >
                    Cidade
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={!cities.length}
                    className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow outline-none text-pf-white disabled:opacity-50"
                  >
                    <option value="">
                      {cities.length
                        ? "Selecione a cidade"
                        : "Selecione um estado primeiro"}
                    </option>

                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Mensagem / Observação
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow focus:border-transparent outline-none text-pf-white"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pf-yellow text-pf-black font-display font-bold py-3 rounded hover:bg-pf-yellow-hover transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
