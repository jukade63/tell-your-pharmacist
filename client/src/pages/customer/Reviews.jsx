import { Avatar, Box, Stack, Typography } from "@mui/material";
import ReviewItem from "../../components/common/ReviewItem";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePharmacy } from "../../contexts/PharmacyContext";

function Reviews() {
  const { pharmacyId } = useParams();
  const { reviews, getReviews, getPharmacyById} = usePharmacy();
  const [pharmacy, setPharmacy] = useState({})

  const ratingAve = reviews?.reduce((acc, el)=>{
    acc += el.star/reviews.length
    return acc
  }, 0)

  const fetchPharmacy = async () => {
    const res = await getPharmacyById(pharmacyId)
    setPharmacy(res.data.pharmacy)

  }

  useEffect(() => {
    fetchPharmacy()
    getReviews(pharmacyId);
  }, [pharmacyId]);

  console.log(pharmacy);


  return (
    <div>
      <Stack mb={3} mt={4} direction="column" alignItems="center">
        <Avatar src={pharmacy.profilePic} sx={{ width: 56, height: 56, mb: 2 }}/>
        <Typography color="secondary" variant='subtitle1'>{pharmacy.storeName}</Typography>
       {reviews.length > 0 ? <Typography color="primary">Rating : {ratingAve?.toFixed(2)} ({reviews?.length})</Typography>: <Typography>ยังไม่มีรีวิวสำหรับร้านนี้</Typography>}
      </Stack>
      {reviews?.map((rev) => {
        return <ReviewItem key={rev.id} {...rev}/>;
      })}
    </div>
  );
}

export default Reviews;
