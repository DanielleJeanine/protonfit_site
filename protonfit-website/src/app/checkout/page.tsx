"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Modificar envio de dados para o backend
    alert("Pedido de orçamento enviado com sucesso! (Verifique o console para os dados)");
    // Limpar carrinho e formulário após o envio
    // setCartItems([]); 
    // setFormData({ ... });
  };

  return (
    <div className="bg-pf-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-12 text-pf-white">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-pf-yellow mb-8 text-center">
          Finalizar Orçamento
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulário de Dados do Cliente */}
          <div className="w-full lg:w-1/2 bg-pf-black p-6 rounded-lg shadow-lg border border-pf-gray">
            <h2 className="text-2xl font-display font-bold mb-6">Seus Dados</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome Completo</label>
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
                <label htmlFor="company" className="block text-sm font-medium mb-1">Empresa</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow focus:border-transparent outline-none text-pf-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
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
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow focus:border-transparent outline-none text-pf-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium mb-1">UF</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow focus:border-transparent outline-none text-pf-white"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">Cidade</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded bg-pf-gray border border-pf-gray-hover focus:ring-2 focus:ring-pf-yellow focus:border-transparent outline-none text-pf-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem / Observação</label>
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
                className="w-full bg-pf-yellow text-pf-black font-display font-bold py-3 rounded hover:bg-pf-yellow-hover transition-colors text-lg"
              >
                Enviar Pedido de Orçamento
              </button>
            </form>
          </div>

          {/* Resumo do Pedido de Orçamento */}
          <div className="w-full lg:w-1/2 bg-pf-black p-6 rounded-lg shadow-lg border border-pf-gray">
            <h2 className="text-2xl font-display font-bold mb-6">Seu Orçamento ({cartItems.length} itens)</h2>
            {cartItems.length === 0 ? (
              <p className="text-pf-white-transparent text-center">Seu carrinho está vazio.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-pf-gray p-3 rounded-md">
                    <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover" />
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-pf-white-transparent">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1 rounded-full bg-pf-black hover:bg-pf-black/70 transition-colors"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="text-lg font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1 rounded-full bg-pf-black hover:bg-pf-black/70 transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 p-1 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}