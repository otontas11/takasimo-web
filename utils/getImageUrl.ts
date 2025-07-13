// Assets altındaki resimleri yükle (logo, ikon vb.)
export const getImageUrl = ({ path, provider = 'cdn' }: { path: string; provider?: string }): string => {
  try {
    // HTTP ile başlayan URL'leri doğrudan döndür
    if (path.includes('http')) {
      return path
    }

    // CDN dosyaları için
    if (provider === 'cdn') {
      return `https://takasimos3.s3.eu-north-1.amazonaws.com${path}`
    }

    // Yerel dosyalar için
    if (provider === 'locale') {
      // İlk olarak doğrudan assets klasöründe ara
      try {
        // Alt klasörlerdeki dosyalar için
        const modules = import.meta.glob('/src/assets/**/*', { eager: true })
        const matchingPath = Object.keys(modules).find((key) => key.endsWith(path))

        if (matchingPath) {
          // @ts-ignore
          return modules[matchingPath].default
        }

        // Klasik yöntem ile dene
        return new URL(`/src/assets/${path}`, import.meta.url).href
      } catch (error) {
        console.error('Yerel dosya yükleme hatası:', error)
        return '/src/assets/logo.png'
      }
    }

    // Varsayılan olarak CDN'e dön
    return `https://takasimos3.s3.eu-north-1.amazonaws.com${path}`
  } catch (error) {
    console.error('getImageUrl hatası:', error)
    return '/src/assets/logo.png'
  }
}
