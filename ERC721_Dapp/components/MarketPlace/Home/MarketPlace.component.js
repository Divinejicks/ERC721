import { useRouter } from "next/router"

export default function MarketPlaceHome() {
    const router = useRouter();
    const query =  router.query;
    console.log(query.signer);
    return(
        <>
            <h1>Market place</h1>
        </>
    )
}