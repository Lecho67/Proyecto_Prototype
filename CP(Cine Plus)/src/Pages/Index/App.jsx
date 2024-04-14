import { blogs } from "../../Helpers/data/data"
import { CardBlog } from "../Principal/Carrusel/CardBlog"
import { Navigation } from "../Principal/Principal"


function App() {
  const carouselBlogs= [...blogs,...blogs]
  return (
    <div className='App'>
        <Navigation/>
      <div className='container my-5'>
				<div className='overflow-x-auto whitespace-nowrap flex-row'>
					<div className='flex whitespace-nowrap animate-scroll'>
						{carouselBlogs.map((blog, index) => (
      
							<CardBlog blog={blog} key={index} />
						))}
					</div>
				</div>
			</div>
    </div>
  )
}

export default App
