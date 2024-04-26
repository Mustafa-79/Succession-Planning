import { useState } from "react"
import './Group15.css'
import ibrahim from "./pages/profile/ibrahim.png"
import ayain from "./pages/profile/ayain.png"
import abdullah from "./pages/profile/abdullah.png"
import safiullah from "./pages/profile/safiullah.jpg"
import mustafa from "./pages/profile/mustafa.jpg"

const Group15 = () => {
    const [person, setPerson] = useState(0)

    const handleToggle = (idx) => {
        setPerson(idx)
    }

    const items = [
        {
            image: ibrahim, // Use the imported defaultImg variable
            header: "Ibrahim",
            txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            image: abdullah,
            header: "Abdullah",
            txt: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            image: ayain, // Use the imported defaultImg variable
            header: "Ayain",
            txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            image: safiullah, // Use the imported defaultImg variable
            header: "Safiullah",
            txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            image: mustafa, // Use the imported defaultImg variable
            header: "Mustafa",
            txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ];
    


    return (
		<div className='overlay-g15'>
			<div className='wrapperForm-g15'>
				<div className='sidebar-g15'>
                <h1>Group 15</h1>
				</div>
				<div className='contentForm-g15'>
					<div className='header-g15'>
                        <h1>Meet the Team</h1>
					</div>
					<div className="main-body">
                    <section className="g15-accordion">
            {items.map((item, idx) => {
                const isActive = person === idx ? 'active' : ''
                return (
                    <article
                        key = {item.image}
                        className = {'g15-accordion-item ' + isActive.toString()}
                        onClick = {() => handleToggle(idx)}
                    >
                        <img src={item.image} />
                        <div className="g15-content">
                            <span className="material-symbols-outlined"></span>
                            <div>
                                <h2>{item.header}</h2>
                                {/* <p>{item.txt}</p> */}
                            </div>
                        </div>
                    </article>

                )
            })}
        </section>
					</div>
				</div>
			</div>
		</div>
    )
}
export default Group15