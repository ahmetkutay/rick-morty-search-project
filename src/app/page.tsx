import SearchComponent from '@/components/searchComponent/searchComponent';
import './page.css'

export default function Home() {
  return (
    <main className='home-wrapper'>
      <div>
        <SearchComponent />
      </div>
    </main>
  )
}
