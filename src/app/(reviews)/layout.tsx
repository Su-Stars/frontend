import Header from '@/components/desktop-header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="bg-gray flex h-full min-h-screen w-full items-center justify-center bg-[#d9d9d9]">
        <div className="min-h-screen w-[640px] bg-white px-6">{children}</div>
      </main>
    </div>
  )
}
