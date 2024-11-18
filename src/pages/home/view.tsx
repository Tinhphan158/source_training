interface IHomeView {
  data: any;
}

function HomeView({ data }: IHomeView) {
  return (
    <div className='h-full w-full bg-[#f5f5f5] p-5 text-center'>
      <div className='flex h-full w-full flex-col gap-10 rounded-lg bg-white p-10 text-2xl font-bold'>
        <p className='text-3xl'>Chào mừng bạn đến với TSP của chúng tôi</p>
        <div className='flex h-20 w-full items-center justify-center gap-20 bg-[#3c9d66] font-normal text-white'>
          <p>{data?.staffId}</p>
          <p>{data?.fullName}</p>
          <p>{data?.department}</p>
          <p>{data?.username}</p>
          <p>{data?.email}</p>
          <p>{data?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
