export default function profilelayout({children}){
    return(
        <div className="flex h-40">
            <div className="w-1/4 bg-gray-500">
                This is Side Bar for Profile
            </div>
            <div className="w-3/4 bg-red-200">
                {children}
            </div>
        </div>
    )
}