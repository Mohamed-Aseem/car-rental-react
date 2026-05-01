import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


const CarDetails = () => {

  const { id } = useParams()
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate, currency } = useAppContext()

  const navigate = useNavigate();

  const [car, setCar] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCar(cars.find((car) => car._id === id))

    return () => {
      setPickupDate('');
      setReturnDate('');
    };
  }, [cars, id])

  useEffect(() => {
    if (pickupDate && returnDate && car) {
      const picked = new Date(pickupDate);
      const returned = new Date(returnDate);

      const noOfDays = Math.ceil(
        (returned - picked) / (1000 * 60 * 60 * 24)
      );

      if (noOfDays > 0) {
        setTotalPrice(noOfDays * car.pricePerDay);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [pickupDate, returnDate, car]);

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/booking/create', {
        car: id,
        pickupDate,
        returnDate
      })
      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>

      <button className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer' onClick={() => navigate(-1)}>
        <img src={assets.arrow_icon} alt='Arrow Icon' className='rotate-180 opacity-65' />
        Back to all cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* Left - Car Image & Details */}
        <div className='lg:col-span-2'>
          <img src={car.image} alt="Car Image" className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md' />

          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
              <p className='text-gray-500 text-lg'>{car.category} - {car.year}</p>
            </div>
            <hr className='border-borderColor my-6' />
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: `${car.fuel_type}` },
                { icon: assets.carIcon, text: `${car.transmission}` },
                { icon: assets.location_icon, text: `${car.location}` },
              ].map(({ icon, text }) => (
                <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt="Icon" className='h-5 mb-2' />
                  {text}
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                  ["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item) => (
                    <li key={item} className='flex items-center text-gray-500'>
                      <img src={assets.check_icon} alt="Check Icon" className='h-4 mr-2' />
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>

        {/* Right - Booking Form */}
        <form onSubmit={handleSumit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>

          <>
            <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
              {currency} {car.pricePerDay} <span className='text-base text-gray-400 font-normal'> per day</span>
            </p>
            {totalPrice > 0 && (
              <p className='mt-2 flex items-center justify-between text-2xl text-gray-800 font-semibold'>
                {currency} {totalPrice} <span className='text-base text-gray-400 font-normal'>Total</span>
              </p>
            )}
          </>

          <hr className='border-borderColor my-6' />

          <div className='flex flex-col gap-2'>
            <label htmlFor="pickup-date">Pickup Date</label>
            <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='pickup-date' min={new Date().toISOString().split('T')[0]} />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="return-date">Return Date</label>
            <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='return-date' min={new Date().toISOString().split('T')[0]} />
          </div>

          <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>Book Now</button>

          <p className='text-center text-sm'>No credit card required to reserve</p>
        </form>
      </div>
    </div>
  ) : <Loader />
}

export default CarDetails