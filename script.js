
// Form Doğrulama
document.addEventListener('DOMContentLoaded', function() {
  // Tüm formlar için doğrulama
  var forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function(form) {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Ürün detay sayfasındaki fiyat listesini yönet
  setupSellerPrices();
  
  // Ürün listeleme sayfasındaki filtreleri ayarla
  setupProductFilters();
});

// Ürün Detay Sayfası - Satıcı Fiyatları Fonksiyonu
function setupSellerPrices() {
  const loadMoreButton = document.getElementById('loadMoreSellers');
  const sellerList = document.getElementById('sellerPricesList');
  
  if (!loadMoreButton || !sellerList) return;
  
  let currentVisible = 5;
  const allSellers = document.querySelectorAll('#sellerPricesList .seller-card');
  
  // İlk 5 satıcıyı göster, diğerlerini gizle
  for (let i = 0; i < allSellers.length; i++) {
    if (i >= currentVisible) {
      allSellers[i].style.display = 'none';
    }
  }
  
  loadMoreButton.addEventListener('click', function() {
    // Sonraki 5 satıcıyı göster
    for (let i = currentVisible; i < currentVisible + 5 && i < allSellers.length; i++) {
      allSellers[i].style.display = 'block';
    }
    
    currentVisible += 5;
    
    // Tüm satıcılar gösterildiyse butonu gizle
    if (currentVisible >= allSellers.length) {
      loadMoreButton.style.display = 'none';
    }
  });
  
  // Renk seçimi
  const colorOptions = document.querySelectorAll('.product-color-option');
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Aktif sınıfı kaldır
      colorOptions.forEach(opt => opt.classList.remove('active'));
      // Tıklanan rengi aktif yap
      this.classList.add('active');
      
      // Burada API'den yeni fiyat bilgilerini çekebilirsiniz
      // Örnek olarak sadece mesaj gösteriyoruz
      const colorName = this.getAttribute('data-color-name');
      console.log(`${colorName} rengi seçildi, fiyatlar güncelleniyor...`);
      
      // Satıcıları sıfırla ve ilk 5 satıcıyı göster
      resetSellerPrices();
    });
  });
}

// Satıcı fiyatlarını sıfırlama fonksiyonu
function resetSellerPrices() {
  const allSellers = document.querySelectorAll('#sellerPricesList .seller-card');
  const loadMoreButton = document.getElementById('loadMoreSellers');
  
  if (!allSellers.length || !loadMoreButton) return;
  
  // Tüm satıcıları gizle, ilk 5'i göster
  for (let i = 0; i < allSellers.length; i++) {
    allSellers[i].style.display = i < 5 ? 'block' : 'none';
  }
  
  // Eğer 5'ten fazla satıcı varsa butonu göster
  loadMoreButton.style.display = allSellers.length > 5 ? 'block' : 'none';
}

// Ürün Listeleme Sayfası - Filtreler
function setupProductFilters() {
  const filterForm = document.getElementById('filterForm');
  const clearFiltersBtn = document.getElementById('clearFilters');
  const sortSelect = document.getElementById('sortOrder');
  
  if (!filterForm || !clearFiltersBtn || !sortSelect) return;
  
  // Filtre formunu işle
  filterForm.addEventListener('submit', function(event) {
    event.preventDefault();
    applyFilters();
  });
  
  // Filtreleri temizle
  clearFiltersBtn.addEventListener('click', function() {
    filterForm.reset();
    applyFilters();
  });
  
  // Sıralama değişikliği
  sortSelect.addEventListener('change', function() {
    applyFilters();
  });
}

// Filtreleri uygulama fonksiyonu (gerçek uygulamada API çağrısı yapılabilir)


// Admin Paneli - İstatistik Grafiklerini Yükle
function loadAdminCharts() {
  // Bu fonksiyon admin paneli için gerekli grafikleri yükleyecek
  // Gerçek uygulamada Chart.js gibi bir kütüphane kullanılabilir
  console.log('Admin grafikleri yükleniyor...');
  
  // Admin paneli sayfasında olup olmadığımızı kontrol et
  if (document.querySelector('.admin-panel') || document.location.pathname.includes('admin-')) {
    // Burada Chart.js vb. kütüphaneler ile grafik oluşturma kodları olacak
    console.log('Admin grafikleri yüklendi');
    
    // Admin sidebar aktif bağlantısını ayarla
    setActiveAdminLink();
    
    // Admin filtre işlemlerini ayarla
    setupAdminFilters();
  }
}

// Admin sidebar aktif bağlantısını ayarlama
function setActiveAdminLink() {
  const currentPage = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('.list-group-item');
  
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPage.includes(href)) {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// Admin Panel Filtreleri
function setupAdminFilters() {
  // Ürün filtreleme formu
  const productFilterForm = document.getElementById('productFilterForm');
  if (productFilterForm) {
    productFilterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log('Ürün filtreleri uygulanıyor...');
      // Burada backend API çağrısı yapılabilir
    });
  }
  
  // Kullanıcı filtreleme formu
  const userFilterForm = document.getElementById('userFilterForm');
  if (userFilterForm) {
    userFilterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log('Kullanıcı filtreleri uygulanıyor...');
      // Burada backend API çağrısı yapılabilir
    });
  }
  
  // Sipariş filtreleme formu
  const orderFilterForm = document.getElementById('orderFilterForm');
  if (orderFilterForm) {
    orderFilterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log('Sipariş filtreleri uygulanıyor...');
      // Burada backend API çağrısı yapılabilir
    });
  }
}

// Admin kullanıcı yönetimi
function setupAdminUserManagement() {
  // Yeni kullanıcı ekleme formu
  const addUserForm = document.getElementById('addUserForm');
  if (addUserForm) {
    addUserForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (addUserForm.checkValidity()) {
        console.log('Yeni kullanıcı ekleniyor...');
        
        // Form verilerini al
        const formData = new FormData(addUserForm);
        const userData = {};
        
        for (let [key, value] of formData.entries()) {
          userData[key] = value;
        }
        
        console.log('Kullanıcı verileri:', userData);
        // Burada backend API çağrısı yapılabilir
        
        // Modal'ı kapat ve formu temizle
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        modal.hide();
        addUserForm.reset();
        
        // Başarı mesajı göster
        alert('Kullanıcı başarıyla eklendi.');
      } else {
        // Form doğrulama hatalarını göster
        event.stopPropagation();
        addUserForm.classList.add('was-validated');
      }
    });
  }
  
  // Kullanıcı düzenleme formu
  const editUserForm = document.getElementById('editUserForm');
  if (editUserForm) {
    editUserForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (editUserForm.checkValidity()) {
        console.log('Kullanıcı güncelleniyor...');
        
        // Form verilerini al
        const formData = new FormData(editUserForm);
        const userData = {};
        
        for (let [key, value] of formData.entries()) {
          userData[key] = value;
        }
        
        console.log('Kullanıcı verileri:', userData);
        // Burada backend API çağrısı yapılabilir
        
        // Modal'ı kapat
        const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        modal.hide();
        
        // Başarı mesajı göster
        alert('Kullanıcı bilgileri başarıyla güncellendi.');
      } else {
        // Form doğrulama hatalarını göster
        event.stopPropagation();
        editUserForm.classList.add('was-validated');
      }
    });
  }
  
  // Kullanıcı tablosundaki toplu seçim
  const selectAllUsers = document.getElementById('selectAllUsers');
  if (selectAllUsers) {
    selectAllUsers.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('input[id^="user"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllUsers.checked;
      });
      
      // Toplu işlem butonlarını etkinleştir/devre dışı bırak
      const bulkActionButtons = document.querySelectorAll('.bulk-action-btn');
      const isAnyChecked = selectAllUsers.checked || Array.from(checkboxes).some(cb => cb.checked);
      
      bulkActionButtons.forEach(btn => {
        btn.disabled = !isAnyChecked;
      });
    });
    
    // Tekil checkboxların durumunu izle
    document.querySelectorAll('input[id^="user"]').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        // Toplu işlem butonlarını etkinleştir/devre dışı bırak
        const bulkActionButtons = document.querySelectorAll('.bulk-action-btn');
        const checkboxes = document.querySelectorAll('input[id^="user"]');
        const isAnyChecked = Array.from(checkboxes).some(cb => cb.checked);
        
        bulkActionButtons.forEach(btn => {
          btn.disabled = !isAnyChecked;
        });
        
        // Tüm checkboxlar seçiliyse "Tümünü Seç" checkbox'ını da işaretle
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        selectAllUsers.checked = allChecked;
      });
    });
  }
  
  // Kullanıcı engelleme/engel kaldırma işlemleri
  const blockButtons = document.querySelectorAll('.block-user-btn');
  if (blockButtons.length > 0) {
    blockButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const userId = this.getAttribute('data-user-id');
        const action = this.getAttribute('data-action'); // block veya unblock
        
        if (confirm(`Bu kullanıcıyı ${action === 'block' ? 'engellemek' : 'engeli kaldırmak'} istediğinizden emin misiniz?`)) {
          console.log(`Kullanıcı ${userId} için ${action} işlemi yapılıyor...`);
          
          // Burada backend API çağrısı yapılabilir
          
          // UI'ı güncelle
          if (action === 'block') {
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.classList.replace('btn-outline-danger', 'btn-outline-success');
            this.setAttribute('data-action', 'unblock');
            this.closest('tr').querySelector('.status-badge').innerHTML = '<span class="badge bg-danger">Engellenmiş</span>';
          } else {
            this.innerHTML = '<i class="fas fa-ban"></i>';
            this.classList.replace('btn-outline-success', 'btn-outline-danger');
            this.setAttribute('data-action', 'block');
            this.closest('tr').querySelector('.status-badge').innerHTML = '<span class="badge bg-success">Aktif</span>';
          }
        }
      });
    });
  }
  
  // İki faktörlü doğrulama değişikliği
  const twoFactorToggle = document.getElementById('twoFactorAuth');
  if (twoFactorToggle) {
    twoFactorToggle.addEventListener('change', function() {
      if (this.checked) {
        // 2FA etkinleştirme UI göster (gerçek uygulamada QR kod vb. gösterilebilir)
        alert('İki faktörlü doğrulama için QR kodu gösterilecek ve kullanıcıya SMS gönderilecek.');
      }
    });
  }
}

// Admin ürün yönetimi
function setupAdminProductManagement() {
  // Tüm ürünleri seçme/seçimi kaldırma
  const selectAllProducts = document.getElementById('selectAllProducts');
  if (selectAllProducts) {
    selectAllProducts.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('input[id^="product"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllProducts.checked;
      });
    });
  }
  
  // Ürün ekleme formu
  const addProductForm = document.getElementById('addProductForm');
  if (addProductForm) {
    addProductForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (addProductForm.checkValidity()) {
        console.log('Yeni ürün ekleniyor...');
        
        // Form verilerini al
        const formData = new FormData(addProductForm);
        const productData = {};
        
        for (let [key, value] of formData.entries()) {
          productData[key] = value;
        }
        
        console.log('Ürün verileri:', productData);
        // Burada backend API çağrısı yapılabilir
        
        // Modal'ı kapat ve formu temizle
        const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
        modal.hide();
        addProductForm.reset();
        
        // Başarı mesajı göster
        alert('Ürün başarıyla eklendi.');
      } else {
        // Form doğrulama hatalarını göster
        event.stopPropagation();
        addProductForm.classList.add('was-validated');
      }
    });
  }
}

// Sayfa yüklendiğinde admin panel fonksiyonlarını çağır
document.addEventListener('DOMContentLoaded', function() {
  loadAdminCharts();
  setupAdminUserManagement();
  setupAdminProductManagement();
});

function applyFilters() {
  console.log('Filtreler uygulanıyor...');
  
  // Seçili şehirleri al
  const selectedCities = [];
  const cityCheckboxes = document.querySelectorAll('input[id^="city"]:checked');
  cityCheckboxes.forEach(checkbox => {
    selectedCities.push(checkbox.value);
  });
  
  console.log('Seçili şehirler:', selectedCities);
  
  // Fiyat aralığını al
  const minPrice = document.querySelector('input[placeholder="Min"]').value;
  const maxPrice = document.querySelector('input[placeholder="Max"]').value;
  console.log('Fiyat aralığı:', minPrice, '-', maxPrice);
  
  // Hafıza seçeneklerini al
  const selectedStorage = [];
  const storageCheckboxes = document.querySelectorAll('input[id^="storage"]:checked');
  storageCheckboxes.forEach(checkbox => {
    selectedStorage.push(checkbox.id.replace('storage', ''));
  });
  console.log('Seçili hafıza:', selectedStorage);
  
  // Burada backend API entegrasyonu yapılabilir
  // Örnek olarak sadece log yazdırıyoruz
}

// Admin Paneli - İstatistik Grafiklerini Yükle
function loadAdminCharts() {
  // Bu fonksiyon admin paneli için gerekli grafikleri yükleyecek
  // Gerçek uygulamada Chart.js gibi bir kütüphane kullanılabilir
  console.log('Admin grafikleri yükleniyor...');
  
  // Admin paneli sayfasında olup olmadığımızı kontrol et
  if (document.querySelector('.admin-dashboard')) {
    console.log('Admin grafikleri yüklendi');
  }
}

// Kullanıcı Paneli - Profil Güncelleme
function updateUserProfile() {
  const profileForm = document.getElementById('profileForm');
  
  if (!profileForm) return;
  
  profileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Form verilerini al
    const formData = new FormData(profileForm);
    const userData = {};
    
    for (let [key, value] of formData.entries()) {
      userData[key] = value;
    }
    
    console.log('Profil güncelleniyor:', userData);
    // Burada backend API çağrısı yapılır
    
    // Başarılı güncelleme mesajı göster
    alert('Profil bilgileriniz başarıyla güncellendi!');
  });
}

// Sayfa yüklendiğinde çalıştırılacak ek fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
  // Mevcut fonksiyonlar...
  
  // Admin ve kullanıcı paneli için ek fonksiyonlar
  loadAdminCharts();
  updateUserProfile();
  setupUserProducts();
  
  // Admin panelinde şehirlere göre sipariş dağılımını göster
  const cityOrdersElement = document.getElementById('cityOrdersChart');
  if (cityOrdersElement) {
    console.log('Şehirlere göre sipariş dağılımı yükleniyor...');
    // Gerçek uygulamada burada grafik oluşturma kodu yer alacak
  }
});

// Kullanıcı Ürün Yönetimi
function setupUserProducts() {
  // Ürün ekleme formu işlemleri
  const addProductForm = document.getElementById('addProductForm');
  if (addProductForm) {
    // Marka seçimine göre model seçeneklerini güncelle
    const brandSelect = document.getElementById('productBrand');
    const modelSelect = document.getElementById('productModel');
    
    brandSelect.addEventListener('change', function() {
      // Marka seçimine göre modelleri güncelle
      modelSelect.innerHTML = '<option value="" selected disabled>Model Seçiniz</option>';
      
      const brand = this.value;
      if (brand === 'apple') {
        addOption(modelSelect, 'iphone13pro', 'iPhone 13 Pro');
        addOption(modelSelect, 'iphone13', 'iPhone 13');
        addOption(modelSelect, 'iphone12pro', 'iPhone 12 Pro');
        addOption(modelSelect, 'iphone12', 'iPhone 12');
        addOption(modelSelect, 'iphone11pro', 'iPhone 11 Pro');
      } else if (brand === 'samsung') {
        addOption(modelSelect, 'galaxys22', 'Galaxy S22');
        addOption(modelSelect, 'galaxys22plus', 'Galaxy S22+');
        addOption(modelSelect, 'galaxys22ultra', 'Galaxy S22 Ultra');
        addOption(modelSelect, 'galaxya53', 'Galaxy A53');
      } else if (brand === 'xiaomi') {
        addOption(modelSelect, 'xiaomi12', 'Xiaomi 12');
        addOption(modelSelect, 'xiaomi12pro', 'Xiaomi 12 Pro');
        addOption(modelSelect, 'redminote11', 'Redmi Note 11');
      }
    });
    
    // Form gönderimi
    addProductForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (addProductForm.checkValidity()) {
        // Form verilerini al
        const formData = new FormData(addProductForm);
        const productData = {};
        
        for (let [key, value] of formData.entries()) {
          productData[key] = value;
        }
        
        console.log('Yeni ürün ekleniyor:', productData);
        // Burada backend API çağrısı yapılabilir
        
        // Modal'ı kapat ve formu temizle
        const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
        modal.hide();
        addProductForm.reset();
        
        // Başarı mesajı göster
        alert('Ürün başarıyla eklendi. Onay sürecinden sonra listelenecektir.');
      } else {
        // Form doğrulama hatalarını göster
        event.stopPropagation();
        addProductForm.classList.add('was-validated');
      }
    });
  }
  
  // Ürün düzenleme formu işlemleri
  const editProductForm = document.getElementById('editProductForm');
  if (editProductForm) {
    editProductForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (editProductForm.checkValidity()) {
        // Form verilerini al
        const formData = new FormData(editProductForm);
        const productData = {};
        
        for (let [key, value] of formData.entries()) {
          productData[key] = value;
        }
        
        console.log('Ürün güncelleniyor:', productData);
        // Burada backend API çağrısı yapılabilir
        
        // Modal'ı kapat
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
        modal.hide();
        
        // Başarı mesajı göster
        alert('Ürün bilgileri başarıyla güncellendi.');
      } else {
        // Form doğrulama hatalarını göster
        event.stopPropagation();
        editProductForm.classList.add('was-validated');
      }
    });
  }
}

// Select'e option eklemek için yardımcı fonksiyon
function addOption(selectElement, value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  selectElement.appendChild(option);
}
