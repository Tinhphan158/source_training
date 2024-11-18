import { Link } from 'react-router-dom';

export function Help() {
  return (
    <div className='h-full w-full bg-[#f5f5f5] p-5 text-center'>
      <div className='flex h-full w-full flex-col gap-10 rounded-lg bg-white p-10 text-2xl font-bold'>
        <p className='text-3xl'>Cần trợ giúp vui lòng liên hệ đến TSP chúng tôi</p>
        <Link to={'mailto:phantrongtinh1508@gmail.com'}>
          <p className='cursor-pointer bg-[#3c9d66] p-5 font-normal text-white hover:underline'>
            Click để liên hệ trợ giúp với chúng tôi
          </p>
        </Link>
      </div>
    </div>
  );
}
