export function Loading() {
  return (
    <div className='fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-overlay-modal'>
      <div className='flex h-screen flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center rounded-lg bg-white p-4'>
          <div className='mb-4 h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-t-[#248e36]'></div>
          <span className='text-xl text-gray-700'>Đang tải...</span>
        </div>
      </div>
    </div>
  );
}
