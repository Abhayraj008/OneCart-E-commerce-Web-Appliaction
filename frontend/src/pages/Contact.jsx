import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Contact() {
  return (
    <>
      {/* MAIN CONTENT */}
      <div className='w-[100vw] min-h-screen flex flex-col items-center bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[90px] pb-[50px]'>

        <Title text1={'CONTACT'} text2={'US'} />

        <div className='w-[90%] max-w-[1200px] mt-[40px] flex flex-col lg:flex-row gap-[40px]'>

          {/* LEFT IMAGE */}
          <div className='lg:w-[50%] w-full'>
            <img 
              src={contact} 
              alt="contact"
              className='w-full h-[350px] object-cover rounded-xl shadow-xl'
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className='lg:w-[50%] w-full bg-[#1c1c1c] p-[30px] rounded-xl shadow-lg flex flex-col gap-[20px]'>

            <div>
              <h2 className='text-white text-[20px] font-semibold'>Our Store</h2>
              <p className='text-gray-300 text-[14px]'>141001 Clock Tower near Railway Station</p>
              <p className='text-gray-300 text-[14px]'>Ludhiana, Punjab, India</p>
            </div>

            <div>
              <p className='text-gray-300 text-[14px]'>📞 +91-8012888884</p>
              <p className='text-gray-300 text-[14px]'>✉ Abhay@onecart.com</p>
            </div>

            <div>
              <h2 className='text-white text-[18px] font-semibold'>Careers at OneCart</h2>
              <p className='text-gray-400 text-[14px]'>
                Learn more about our teams and job openings
              </p>
            </div>

            <button className='w-fit px-[25px] py-[12px] bg-white text-black rounded-md font-medium hover:bg-gray-200 transition'>
              Explore Jobs →
            </button>

          </div>
        </div>

        {/* NEWSLETTER */}
        <div className='w-full mt-[60px]'>
          <NewLetterBox />
        </div>

      </div>

      {/* ✅ FOOTER OUTSIDE */}
      <Footer />

    </>
  )
}

export default Contact