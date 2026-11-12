
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRelove } from "../../context/ReloveContext";
import ProductImage from "../../components/ProductImage";

const contacts = [
  { name: "Nabila Pradita", status: "Online", color: "#E9EEDF" },
  { name: "Rara Putri", status: "Aktif baru-baru ini", color: "#F4E7E9" },
  { name: "Aziz Maulana", status: "Aktif baru-baru ini", color: "#E8EDF1" },
  { name: "Novia Safitri", status: "Aktif baru-baru ini", color: "#F1EBDD" }
];

const formatPrice = (value) =>
  `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

export default function ChatPage() {
  const router = useRouter();

  const {
    conversations,
    sendMessage,
    products,
    setCart
  } = useRelove();

  const [selectedContact, setSelectedContact] = useState(null);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [offer, setOffer] = useState(false);
  const [offerPrice, setOfferPrice] = useState("42000");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedContact(params.get("with") || null);
  }, []);

  const contactNames = Array.from(
    new Set([
      ...contacts.map((contact) => contact.name),
      ...Object.keys(conversations || {})
    ])
  );

  const filteredContacts = contactNames
    .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aMessages = conversations?.[a] || [];
      const bMessages = conversations?.[b] || [];

      const aTime = aMessages.length
        ? aMessages[aMessages.length - 1].id || 0
        : 0;

      const bTime = bMessages.length
        ? bMessages[bMessages.length - 1].id || 0
        : 0;

      return String(bTime).localeCompare(String(aTime));
    });

  const currentMessages = selectedContact
    ? conversations?.[selectedContact] || []
    : [];

  const selectedProduct = products.find(
    (item) => item.seller === selectedContact
  );

  const product = selectedProduct || products[0];

  const getLastMessage = (name) => {
    const list = conversations?.[name] || [];
    return list.length ? list[list.length - 1].text : "Mulai percakapan";
  };

  const getLastTime = (name) => {
    const list = conversations?.[name] || [];
    return list.length ? list[list.length - 1].time : "";
  };

  const getContact = (name) =>
    contacts.find((item) => item.name === name) || {
      name,
      status: "Pengguna Relove",
      color: "#E9EEDF"
    };

  const openChat = (name) => {
    setSelectedContact(name);
    setDraft("");
    router.push(`/chat?with=${encodeURIComponent(name)}`);
  };

  const backToInbox = () => {
    setSelectedContact(null);
    setDraft("");
    router.push("/chat");
  };

  const submit = (event) => {
    event.preventDefault();

    if (!draft.trim() || !selectedContact) return;

    sendMessage(draft.trim(), selectedContact, "buyer");
    setDraft("");
  };

  const sendQuickReply = (message) => {
    if (!selectedContact) return;
    sendMessage(message, selectedContact, "buyer");
  };

  const sendOffer = () => {
    if (!selectedContact || !offerPrice) return;

    sendMessage(
      `Mengajukan tawaran harga: ${formatPrice(offerPrice)}`,
      selectedContact,
      "buyer"
    );

    setOffer(false);
  };

  const buyProduct = () => {
    if (!product) return;
    setCart(product.id);
    router.push("/checkout");
  };

  const selected = selectedContact ? getContact(selectedContact) : null;

  return (
    <div className="relove-messages">
      <style>{`
        .relove-messages {
          width: 100%;
          min-height: 75vh;
          padding: 24px 18px 110px;
          background: #fff;
          color: #30352e;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          box-sizing: border-box;
        }

        .relove-messages *,
        .relove-messages *::before,
        .relove-messages *::after {
          box-sizing: border-box;
        }

        .relove-messages button,
        .relove-messages input {
          font: inherit;
        }

        .relove-messages svg {
          display: block;
          width: 20px;
          height: 20px;
          max-width: 20px;
          max-height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .rm-eyebrow {
          display: block;
          margin-bottom: 7px;
          color: #747b58;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.3px;
        }

        .rm-heading h1 {
          margin: 0;
          color: #294b37;
          font-size: 29px;
          line-height: 1.2;
          font-weight: 750;
          letter-spacing: -.7px;
        }

        .rm-heading p {
          margin: 7px 0 20px;
          color: #85877e;
          font-size: 12px;
          line-height: 1.5;
        }

        .rm-search {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          height: 45px;
          padding: 0 14px;
          margin: 0 0 22px;
          border: 1px solid #eeeeea;
          border-radius: 13px;
          background: #f7f7f3;
          color: #85877e;
        }

        .rm-search input {
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #30352e;
          font-size: 12px;
        }

        .rm-search input::placeholder {
          color: #a0a198;
        }

        .rm-section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 7px;
        }

        .rm-section-title h2 {
          margin: 0;
          color: #30352e;
          font-size: 14px;
          font-weight: 750;
        }

        .rm-section-title span {
          color: #96988e;
          font-size: 10px;
        }

        .rm-contact-list {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .rm-contact {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-height: 76px;
          padding: 12px 2px;
          margin: 0;
          border: 0;
          border-bottom: 1px solid #eeeeea;
          border-radius: 0;
          background: #fff;
          color: #30352e;
          text-align: left;
          cursor: pointer;
          box-shadow: none;
          appearance: none;
          -webkit-appearance: none;
        }

        .rm-contact:active {
          background: #fafaf7;
        }

        .rm-avatar {
          display: flex;
          flex: 0 0 49px;
          align-items: center;
          justify-content: center;
          width: 49px;
          height: 49px;
          border-radius: 50%;
          background: #e9eedf;
          color: #405b43;
          font-size: 17px;
          font-weight: 750;
        }

        .rm-contact-info {
          flex: 1;
          min-width: 0;
        }

        .rm-contact-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: 100%;
        }

        .rm-contact-top strong {
          display: block;
          overflow: hidden;
          color: #30352e;
          font-size: 12px;
          font-weight: 750;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .rm-contact-top time {
          flex: 0 0 auto;
          color: #a0a198;
          font-size: 9px;
          white-space: nowrap;
        }

        .rm-contact-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-top: 6px;
        }

        .rm-preview {
          display: block;
          min-width: 0;
          overflow: hidden;
          color: #85877e;
          font-size: 11px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .rm-unread {
          flex: 0 0 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #69784b;
        }

        .rm-empty {
          padding: 45px 12px;
          color: #85877e;
          text-align: center;
          font-size: 12px;
        }

        .rm-empty strong {
          display: block;
          margin-bottom: 5px;
          color: #30352e;
          font-size: 14px;
        }

        .rm-chat {
          padding: 0 0 170px;
          min-height: 75vh;
        }

        .rm-chat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 66px;
          margin: -24px -18px 0;
          padding: 10px 16px;
          border-bottom: 1px solid #eeeeea;
          background: #fff;
        }

        .rm-back {
          display: grid;
          place-items: center;
          flex: 0 0 34px;
          width: 34px;
          height: 34px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: #f4f5ef;
          color: #40543a;
        }

        .rm-chat-person {
          display: flex;
          flex: 1;
          min-width: 0;
          flex-direction: column;
          gap: 3px;
        }

        .rm-chat-person strong {
          overflow: hidden;
          color: #30352e;
          font-size: 13px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .rm-chat-person small {
          color: #85877e;
          font-size: 10px;
        }

        .rm-security {
          padding: 11px 12px;
          margin: 13px 0;
          border-radius: 11px;
          background: #f3f5ed;
          color: #42563a;
        }

        .rm-security strong {
          font-size: 10px;
        }

        .rm-security p {
          margin: 4px 0 0;
          color: #73796a;
          font-size: 10px;
          line-height: 1.5;
        }

        .rm-product {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px;
          margin-bottom: 13px;
          border: 1px solid #eeeeea;
          border-radius: 12px;
          background: #fff;
        }

        .rm-product-image {
          flex: 0 0 54px;
          width: 54px;
          height: 54px;
          overflow: hidden;
          border-radius: 8px;
        }

        .rm-product-info {
          display: flex;
          flex: 1;
          min-width: 0;
          flex-direction: column;
          gap: 4px;
        }

        .rm-product-info strong {
          overflow: hidden;
          color: #30352e;
          font-size: 10px;
          line-height: 1.4;
          text-overflow: ellipsis;
        }

        .rm-product-info span {
          color: #36543b;
          font-size: 11px;
          font-weight: 750;
        }

        .rm-buy {
          flex: 0 0 auto;
          padding: 8px 12px;
          border: 0;
          border-radius: 20px;
          background: #59633a;
          color: white;
          font-size: 10px;
          font-weight: 700;
        }

        .rm-quick-replies {
          display: flex;
          gap: 7px;
          overflow-x: auto;
          padding: 2px 0 13px;
          scrollbar-width: none;
        }

        .rm-quick-replies button {
          flex: 0 0 auto;
          padding: 8px 11px;
          border: 1px solid #e7e9df;
          border-radius: 20px;
          background: white;
          color: #59633a;
          font-size: 10px;
        }

        .rm-date {
          width: fit-content;
          padding: 5px 10px;
          margin: 5px auto 15px;
          border-radius: 20px;
          background: #f4f5ef;
          color: #85877e;
          font-size: 9px;
        }

        .rm-messages {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-bottom: 15px;
        }

        .rm-no-message {
          padding: 25px 12px;
          color: #85877e;
          text-align: center;
          font-size: 11px;
        }

        .rm-bubble {
          max-width: 82%;
          padding: 10px 12px;
          border-radius: 14px;
          font-size: 11px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .rm-bubble p {
          margin: 0;
        }

        .rm-bubble time {
          display: block;
          margin-top: 5px;
          color: #85877e;
          text-align: right;
          font-size: 8px;
        }

        .rm-bubble.sent {
          align-self: flex-end;
          border-bottom-right-radius: 4px;
          background: #e9edda;
          color: #394531;
        }

        .rm-bubble.received {
          align-self: flex-start;
          border-bottom-left-radius: 4px;
          background: #f3f3ef;
          color: #30352e;
        }

        .rm-offer {
          padding: 12px;
          margin-bottom: 12px;
          border: 1px solid #e9eadf;
          border-radius: 12px;
          background: #fafaf7;
        }

        .rm-offer label {
          display: block;
          margin-bottom: 8px;
          color: #555d48;
          font-size: 11px;
          font-weight: 700;
        }

        .rm-offer-row {
          display: flex;
          gap: 7px;
        }

        .rm-offer-row input {
          flex: 1;
          width: 0;
          min-width: 0;
          padding: 9px;
          border: 1px solid #e5e6dc;
          border-radius: 8px;
          background: white;
          font-size: 12px;
        }

        .rm-offer-row button {
          padding: 8px 12px;
          border: 0;
          border-radius: 8px;
          background: #59633a;
          color: white;
          font-size: 10px;
          font-weight: 700;
        }

        .rm-composer {
          position: fixed;
          z-index: 40;
          bottom: 76px;
          left: 50%;
          display: flex;
          align-items: center;
          gap: 7px;
          width: min(100%, 430px);
          padding: 9px 12px;
          border-top: 1px solid #eeeeea;
          background: white;
          transform: translateX(-50%);
        }

        .rm-composer input {
          flex: 1;
          width: 0;
          min-width: 0;
          height: 40px;
          padding: 0 13px;
          border: 1px solid #eeeeea;
          border-radius: 22px;
          outline: 0;
          background: #f7f7f3;
          color: #30352e;
          font-size: 12px;
        }

        .rm-composer button {
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          min-width: 34px;
          height: 34px;
          padding: 0 10px;
          border: 0;
          border-radius: 20px;
          background: #edf0e5;
          color: #40543a;
          font-size: 11px;
          font-weight: 700;
        }

        .rm-composer .rm-send {
          width: 36px;
          min-width: 36px;
          border-radius: 50%;
          background: #59633a;
          color: white;
        }

        @media (min-width: 700px) {
          .relove-messages {
            max-width: 760px;
            margin: 0 auto;
            padding-right: 25px;
            padding-left: 25px;
          }

          .rm-composer {
            width: min(100%, 760px);
          }
        }
      `}</style>

      {!selectedContact ? (
        <>
          <header className="rm-heading">
            <span className="rm-eyebrow">RELOVE MESSAGES</span>
            <h1>Pesan</h1>
            <p>Semua percakapanmu ada di sini.</p>
          </header>

          <label className="rm-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari percakapan..."
            />
          </label>

          <div className="rm-section-title">
            <h2>Semua Pesan</h2>
            <span>{filteredContacts.length} percakapan</span>
          </div>

          <div className="rm-contact-list">
            {filteredContacts.map((name) => {
              const person = getContact(name);
              const lastMessage = getLastMessage(name);
              const lastTime = getLastTime(name);

              return (
                <button
                  type="button"
                  className="rm-contact"
                  key={name}
                  onClick={() => openChat(name)}
                >
                  <span
                    className="rm-avatar"
                    style={{ background: person.color }}
                  >
                    {name.charAt(0).toUpperCase()}
                  </span>

                  <span className="rm-contact-info">
                    <span className="rm-contact-top">
                      <strong>{name}</strong>
                      <time>{lastTime}</time>
                    </span>

                    <span className="rm-contact-bottom">
                      <span className="rm-preview">{lastMessage}</span>
                    </span>
                  </span>
                </button>
              );
            })}

            {filteredContacts.length === 0 && (
              <div className="rm-empty">
                <strong>Percakapan tidak ditemukan</strong>
                Coba cari dengan nama lain.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="rm-chat">
          <header className="rm-chat-header">
            <button
              type="button"
              className="rm-back"
              onClick={backToInbox}
              aria-label="Kembali"
            >
              <svg viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <span className="rm-avatar" style={{ background: selected.color }}>
              {selectedContact.charAt(0).toUpperCase()}
            </span>

            <span className="rm-chat-person">
              <strong>{selectedContact}</strong>
              <small>{selected.status}</small>
            </span>
          </header>

          <div className="rm-security">
            <strong>Pengingat keamanan</strong>
            <p>
              Jaga informasi pribadimu dan pastikan transaksi
              dilakukan dengan aman.
            </p>
          </div>

          {product && (
            <div className="rm-product">
              <div className="rm-product-image">
                <ProductImage product={product} />
              </div>

              <div className="rm-product-info">
                <strong>{product.title}</strong>
                <span>{formatPrice(product.price)}</span>
              </div>

              <button
                type="button"
                className="rm-buy"
                onClick={buyProduct}
              >
                Beli
              </button>
            </div>
          )}

          <div className="rm-quick-replies">
            {[
              "Apakah masih tersedia?",
              "Boleh nego?",
              "Bisa COD?",
              "Boleh minta foto tambahan?"
            ].map((message) => (
              <button
                type="button"
                key={message}
                onClick={() => sendQuickReply(message)}
              >
                {message}
              </button>
            ))}
          </div>

          <div className="rm-date">Riwayat percakapan</div>

          <div className="rm-messages">
            {currentMessages.length === 0 && (
              <div className="rm-no-message">
                Belum ada pesan. Mulai percakapan dengan {selectedContact}.
              </div>
            )}

            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`rm-bubble ${
                  message.from === "seller" ? "received" : "sent"
                }`}
              >
                <p>{message.text}</p>
                <time>{message.time}</time>
              </div>
            ))}
          </div>

          {offer && (
            <div className="rm-offer">
              <label htmlFor="rm-offer-price">
                Masukkan tawaran harga
              </label>

              <div className="rm-offer-row">
                <input
                  id="rm-offer-price"
                  type="number"
                  min="1"
                  value={offerPrice}
                  onChange={(event) => setOfferPrice(event.target.value)}
                />

                <button type="button" onClick={sendOffer}>
                  Kirim
                </button>

                <button
                  type="button"
                  onClick={() => setOffer(false)}
                >
                  Tutup
                </button>
              </div>
            </div>
          )}

          <form className="rm-composer" onSubmit={submit}>
            <button
              type="button"
              onClick={() => setOffer(true)}
              aria-label="Buat tawaran"
            >
              +
            </button>

            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Tulis pesan..."
            />

            <button type="button" onClick={() => setOffer(true)}>
              Nego
            </button>

            <button type="submit" className="rm-send" aria-label="Kirim">
              <svg viewBox="0 0 24 24">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
