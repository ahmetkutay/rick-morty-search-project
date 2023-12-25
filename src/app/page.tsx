import SearchComponent from '@/components/searchComponent/searchComponent';

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div>
        <SearchComponent />
      </div>
    </main>
  )
}
