"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react"; // Ícones para fechar e enviar

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* BOTÃO FLUTUANTE (O que já fizemos) */}
      <div
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 group cursor-pointer transition-all hover:scale-105 active:scale-95 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="flex items-center relative h-[38px]">
          <div className="absolute -left-1 z-10 flex items-center justify-center">
            <Image
              src="/chatbot-icon.svg"
              alt="Alerta"
              width={68}
              height={68}
              className="object-contain drop-shadow-sm"
            />
          </div>
          <div className="bg-[#FFD700]/80 pl-16 pr-4 h-full flex items-center rounded-lg shadow-md border border-black/5 backdrop-blur-sm">
            <span className="text-black font-black text-[13px] uppercase tracking-tighter whitespace-nowrap">
              Pergunte ao Alerta!
            </span>
          </div>
        </div>
      </div>

      {/* JANELA DE CHAT (O Modal) */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[60] w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-black/5 animate-in slide-in-from-bottom-5">
          {/* Cabeçalho do Chat */}
          <div className="bg-[#FFD700] p-4 rounded-t-2xl flex items-center justify-between border-b border-black/10">
            <div className="flex items-center gap-3">
              <Image
                src="/chatbot-icon.svg"
                alt="IA Alerta"
                width={68}
                height={68}
              />
              <span className="font-bold text-black text-sm">
                Assistente Alerta
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-black/10 p-1 rounded-full transition-colors"
            >
              <X size={20} className="text-black" />
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 text-sm">
            <div className="bg-white p-3 rounded-tr-xl rounded-b-xl shadow-sm border border-black/5 max-w-[85%]">
              <p className="text-gray-800">
                Olá! 👋 Eu sou a Inteligência do **Alerta ao Consumidor**. Posso
                te ajudar a verificar se um site é seguro ou analisar uma
                empresa suspeita. O que você gostaria de saber hoje?
              </p>
            </div>
          </div>

          {/* Input de Texto */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl">
              <input
                placeholder="Descreva sua dúvida..."
                className="bg-transparent flex-1 outline-none text-sm px-2 text-black"
              />
              <button className="bg-[#FFD700] p-2 rounded-lg hover:brightness-95 transition-all">
                <Send size={16} className="text-black" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              A IA pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
