
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

const ReloveContext = createContext(null);

const initialProducts = [
  {
    id: "1",
    title: "Cardigan Rajut Oversize Sage Green",
    price: 48000,
    oldPrice: 120000,
    category: "Fashion Wanita",
    condition: "Seperti Baru",
    campus: "FMIPA UNNES",
    distance: "300 m",
    seller: "Nabila Pradita",
    image: "/images/CardiganRajutOversizeSageGreen.jpg",
    negotiable: true,
    description: "Kondisi 9.5/10, jarang banget dipakai karena salah ukuran pas checkout thrift online. Bahan rajut tebal premium dan nyaman dipakai kuliah.",
    size: "All Size Fit L",
    likes: 38
  },
  {
    id: "2",
    title: "Buku Bumi Series Tere Liye — Selena",
    price: 35000,
    oldPrice: 50000,
    category: "Buku Kuliah",
    condition: "Baik",
    campus: "FIP UNNES",
    distance: "1 km",
    seller: "Raka Firmansyah",
    image: "/images/BukuBumiSeriesTereLiyeSelena.webp",
    negotiable: true,
    description: "Buku original, halaman lengkap dan bersih. Ada sedikit bekas pemakaian di sampul.",
    size: "Paperback",
    likes: 12
  },
  {
    id: "3",
    title: "Blouse Floral Korea Vintage",
    price: 55000,
    oldPrice: 120000,
    category: "Fashion Wanita",
    condition: "Seperti Baru",
    campus: "FBS UNNES",
    distance: "500 m",
    seller: "Dinda Ayu",
    image: "/images/BlouseFloralKoreanVintage.jpg",
    negotiable: true,
    description: "Blouse floral vintage dengan bahan ringan. Cocok untuk daily outfit maupun acara kampus.",
    size: "M",
    likes: 21
  },
  {
    id: "4",
    title: "Diktat Kalkulus Edisi 9 Purcell",
    price: 40000,
    oldPrice: 95000,
    category: "Buku Kuliah",
    condition: "Baik",
    campus: "FMIPA UNNES",
    distance: "300 m",
    seller: "Fajar Ramadhan",
    image: "/images/DiktatKalkulusEdisi9Purcell.webp",
    negotiable: false,
    description: "Diktat kalkulus edisi 9. Isi masih sangat layak untuk belajar dan persiapan ujian.",
    size: "Edisi 9",
    likes: 9
  },
  {
    id: "5",
    title: "Sepatu Ventela Basic High 39 Ori",
    price: 85000,
    oldPrice: 210000,
    category: "Fashion Pria",
    condition: "Baik",
    campus: "Cempakasari",
    distance: "1.2 km",
    seller: "Kevin Sanjaya",
    image: "/images/SepatuVentelaHighBasic39Ori.webp",
    negotiable: true,
    description: "Sepatu original, ukuran 39. Sol masih kokoh dan nyaman digunakan.",
    size: "39",
    likes: 17
  },
  {
    id: "6",
    title: "Rak Sepatu Susun Portable Kos",
    price: 30000,
    oldPrice: 60000,
    category: "Kosan",
    condition: "Layak Pakai",
    campus: "Banaran UNNES",
    distance: "700 m",
    seller: "Alya Putri",
    image: "/images/RakSepatuSusunPortableKos.jpg",
    negotiable: false,
    description: "Rak portable untuk kamar kos. Mudah dibongkar pasang dan hemat tempat.",
    size: "4 tingkat",
    likes: 6
  },
  {
    id: "7",
    title: "Jaket Denim Oversize Light Blue",
    price: 65000,
    oldPrice: 150000,
    category: "Fashion Pria",
    condition: "Baik",
    campus: "Sekaran Pusat",
    distance: "800 m",
    seller: "Nabila Pradita",
    image: "/images/JacketDenimOversizeLightBlue.jpg",
    negotiable: true,
    description: "Jaket denim oversize warna light blue. Tidak ada sobek, warna masih bagus.",
    size: "L",
    likes: 15
  },
  {
    id: "8",
    title: "Catokan Rambut Mini Travel 20W",
    price: 28000,
    oldPrice: 55000,
    category: "Elektronik",
    condition: "Seperti Baru",
    campus: "Gg. Guru UNNES",
    distance: "1 km",
    seller: "Mila Safitri",
    image: "/images/CatokanRambutMiniPortable20W.jpg",
    negotiable: false,
    description: "Catokan mini travel, berfungsi normal dan cepat panas.",
    size: "20W",
    likes: 11
  },
  {
    id: "9",
    title: "Tote Bag Kanvas UNNES",
    price: 25000,
    oldPrice: 45000,
    category: "Aksesori",
    condition: "Baik",
    campus: "Sekaran",
    distance: "400 m",
    seller: "Andini Pratama",
    image: "/images/ToteBagCanvasUNNES.jpg",
    negotiable: true,
    description: "Tote bag kanvas tebal, muat laptop dan buku kuliah.",
    size: "One size",
    likes: 14
  },
  {
    id: "10",
    title: "Body Lotion",
    price: 40000,
    oldPrice: 65000,
    category: "Perawatan Diri",
    condition: "Seperti Baru",
    campus: "UNNES Sekaran",
    distance: "600 m",
    seller: "Rani",
    image: "/images/BodyLotion.jpg",
    negotiable: true,
    description: "Body lotion dalam kondisi baik dan masih layak digunakan.",
    size: "250 ml",
    likes: 8
  }
];

const initialConversations = {
  "Nabila Pradita": [
    {
      id: 1,
      from: "seller",
      text: "Halo! Masih ada kak, baru dicuci laundry wangi juga siap pakai kuliah.",
      time: "09:16"
    }
  ],
  "Rara Putri": [
    {
      id: 2,
      from: "seller",
      text: "Hai! Ada yang mau ditanyakan tentang barangku?",
      time: "09:42"
    }
  ],
  "Aziz Maulana": [
    {
      id: 3,
      from: "seller",
      text: "Oke, aku tunggu kabarnya ya!",
      time: "Kemarin"
    }
  ],
  "Novia Safitri": [
    {
      id: 4,
      from: "seller",
      text: "Terima kasih sudah menghubungi aku!",
      time: "Kemarin"
    }
  ]
};

export function ReloveProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [conversations, setConversations] = useState(initialConversations);
  const [cart, setCart] = useState("1");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("relove-demo") || "{}"
      );

      if (saved.products) {
        setProducts(
          saved.products.map((product) => {
            const base = initialProducts.find(
              (item) => item.id === product.id
            );

            return base
              ? { ...product, ...base }
              : product;
          })
        );
      }

      if (saved.wishlist) {
        setWishlist(saved.wishlist);
      }

      if (saved.orders) {
        setOrders(saved.orders);
      }

      if (saved.conversations) {
        setConversations({
          ...initialConversations,
          ...saved.conversations
        });
      } else if (saved.messages) {
        setConversations({
          ...initialConversations,
          "Nabila Pradita": saved.messages
        });
      }

      if (saved.cart) {
        setCart(saved.cart);
      }
    } catch (error) {
      console.warn("Data demo Relove tidak dapat dibaca.", error);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "relove-demo",
        JSON.stringify({
          products,
          wishlist,
          orders,
          conversations,
          cart
        })
      );
    } catch (error) {
      console.warn(
        "Penyimpanan lokal penuh. Kurangi ukuran foto yang diunggah.",
        error
      );
    }
  }, [
    products,
    wishlist,
    orders,
    conversations,
    cart,
    hydrated
  ]);

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addProduct = (product) => {
    setProducts((current) => [
      { ...product, id: String(Date.now()), likes: 0 },
      ...current
    ]);
  };

  const sendMessage = (text, contactName, from = "buyer") => {
    if (!text.trim() || !contactName) return;

    const newMessage = {
      id: Date.now(),
      from,
      text: text.trim(),
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setConversations((current) => ({
      ...current,
      [contactName]: [
        ...(current[contactName] || []),
        newMessage
      ]
    }));
  };

  const value = useMemo(
    () => ({
      products,
      wishlist,
      orders,
      conversations,
      cart,
      setCart,
      toggleWishlist,
      addProduct,
      sendMessage,
      addOrder: (order) =>
        setOrders((current) => [order, ...current])
    }),
    [
      products,
      wishlist,
      orders,
      conversations,
      cart
    ]
  );

  return (
    <ReloveContext.Provider value={value}>
      {children}
    </ReloveContext.Provider>
  );
}

export function useRelove() {
  const value = useContext(ReloveContext);

  if (!value) {
    throw new Error(
      "useRelove harus digunakan di dalam ReloveProvider"
    );
  }

  return value;
}
