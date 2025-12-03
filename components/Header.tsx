export default function Header() {
  return (
    <header className=" w-full h-12 bg-stone-50 shadow fixed  flex  flex-wrap items-center justify-between ">
      <div className="mx-4 flex gap-2 items-center ">
        <div className="size-10 rounded-full bg-gray-200 border-gray-50 border "></div>
        <span className="font-bold text-gray-950">Muruganantham</span>
      </div>
      <div>{/* <EllipsisVertical className="mx-4 " /> */}</div>
    </header>
  );
}
