import React from 'react'
import Aboutpage from '../Aboutpage/Aboutpage'
import Footer from '../Footer/Footer'

const About=()=> {
  return (
    <div>
      <Aboutpage/>
      <Footer/>
    </div>
  )
}

export default About
// app.get('/ListofItems/:itemId', async (req, res) => {
//   try {
//     console.log("Fetching item with itemId:", req.params.itemId);
   
//     const itemId = req.params.itemId; 
//     const item = await ItemModel.findById({itemId }).exec();
    
//     if (!item) {
//       return res.status(404).json({ error: 'Item not found' });
//     }

//     res.status(200).json(item);
//   } catch (error) {
//     console.error("Error fetching item:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// app.get('/ListofItems/:itemId' , async(req, res)=>{
//   try{
//   const {id} = req.params;
//   const item = await ItemModel.findById(id).exec();
//   // return res.status(200).json(item) 

//   if (!item) {
//     return res.status(404).json({ error: 'Item not found' });
//   }
  
//   return res.status(200).json(item)
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// })