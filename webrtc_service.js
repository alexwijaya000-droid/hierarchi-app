// ==========================================
// FILE: webrtc_service.js
// TUGAS: Menangani akses kamera/layar
// ==========================================

const WebRTCServiceMixin = {
  data() {
    return {
      // GANTI URL DI BAWAH INI DENGAN URL DARI NOTEPAD ANDA
      gasEndpoint: "https://script.google.com/macros/s/AKfycbxruSjnzYurpnQt7qMPYOym4ocT98RC2gNpaFpO3HYzuAGMPbK3mb2IeJ4436_XIyg5xA/exec" 
    }
  },
  methods: {
    async startSession() {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const track = stream.getVideoTracks()[0];
        
        // Ambil screenshot setiap 1 jam
        setInterval(async () => {
          const imageCapture = new ImageCapture(track);
          const bitmap = await imageCapture.grabFrame();
          const canvas = document.createElement('canvas');
          canvas.width = bitmap.width; canvas.height = bitmap.height;
          canvas.getContext('2d').drawImage(bitmap, 0, 0);
          
          // Kirim ke GAS
          fetch(this.gasEndpoint, {
            method: "POST",
            body: JSON.stringify({
              action: "saveScreenshot",
              email: this.currentUserEmail || "staf@hierarki.com",
              image: canvas.toDataURL('image/png')
            })
          });
        }, 3600000); // 1 Jam = 3.600.000 milidetik

        alert("Sesi Kerja Dimulai.");
      } catch (err) {
        alert("Akses layar ditolak. Pastikan Anda mengizinkan izin berbagi layar.");
      }
    }
  }
};