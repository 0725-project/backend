import localFont from 'next/font/local'
import './globals.css'

const pretendard = localFont({
    src: '../../public/fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '300',
    variable: '--font-pretendard',
})

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <html lang='en' className={`${pretendard.variable}`}>
        <body className={pretendard.className}>{children}</body>
    </html>
)

export default RootLayout
