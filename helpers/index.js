class Helpers{
    static ratingAverage(data){
        let totalRating = 0
        let countReview = 0
        let average = totalRating/countReview

        data[0].Users.forEach(list => {
            countReview += 1
            totalRating += list.Review.rating
        })
        
        if(totalRating === 0 && countReview === 0){
            return 0
        }
        else{
            return Number((totalRating/countReview).toFixed(1))
        }
    }

}

module.exports = Helpers