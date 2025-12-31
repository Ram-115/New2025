const User = require("../Schemas/LoginSchema");
const bcrypt = require("bcryptjs");
const products = require("../Schemas/ProductSchema");
const addtocarts = require("../Schemas/AddtoCartSchema");
const Address = require("../Schemas/AddressSchema");
const path = require("path");
const orders = require("../Schemas/orderSchema");
const crypto = require("crypto");
const razorpay = require("../Config/razorPay");
exports.signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    console.log("Signup request received:", { name, email });

    // ❗ Validate fields
    if (!name || !email || !password) {
      return res.json({
        status: false,
        message: "All fields are required"
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.json({
        status: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = { name, email, password: hashedPassword };

    const user = await User.create(data);

    return res.json({
      status: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name || '',
        email: user.email || ''
      }
    });

  } catch (e) {
    console.error("Signup error:", e.message);
    return res.json({
      status: false,
      message: "Server error"
    });
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.json({ status: false, message: "User not exist" ,profileImage: user.profileImage});
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.json({ status: false, message: "Wrong password" });
      }
  
      return res.json({ 
        status: true, 
        message: "Login success", 
        objectId: user._id,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage || null
        }
      });
  
    } catch (e) {
      return res.json({ status: false, message: "Server error" });
    }
  };
  
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.addProduct = async(req,res)=>{
    try{
        const {ProductName,Price,ProductImage,Description,Category,Stock}=req.body;
        if(!ProductName || !Price || !ProductImage || !Description || !Category || !Stock){
          return res.json({status:false,message:"All fields are required"});
        }
        const product = await products.create({ProductName,Price,ProductImage,Description,Category,Stock});
        if(product){
            return res.json({status:true,message:"Product added successfully",product});
        }else{
            return res.json({status:false,message:"Product not added"});
        }
    }catch(error){
        res.json({status:false,message:"Server error"});
    }
}

exports.getProducts = async(req,res)=>{
    try{    
        const productsDetails = await products.find();
        res.json({status:true,message:"Products fetched successfully",products:productsDetails});
    }catch(error){
        res.json({status:false,message:"Server error"});
    }
}
exports.addToCart = async(req,res)=>{
    try{

      const {userId,productId,quantity,price,ProductName,ProductImage,ProductDescription,ProductPrice,totalQuantity,Stock} = req.body;
      const existingCartItem = await addtocarts.findOne({
        userId: userId,
        productId: productId
      });
      if(existingCartItem){
        return res.json({status:false,message:"Product already in cart increase the quantity in cart"});
      }
        console.log("Add to cart request body:", req.body);
                // Add missing required fields
        const addToCartData = {
            userId,
            productId,
            quantity,
            price,
            ProductName,
            ProductImage,
            ProductPrice: ProductPrice || price, // Use ProductPrice if provided, else use price
            ProductDescription,
            Stock,
            totalQuantity: totalQuantity || quantity // Use totalQuantity if provided, else use quantity
        };
        
        console.log("Creating cart item with data:", addToCartData);
        const addToCart = await addtocarts.create(addToCartData);
        if(addToCart){
            return res.json({status:true,message:"Product added to cart successfully",addToCart});
        }else{
            return res.json({status:false,message:"Product not added to cart"});
        }
    }catch(error){
        console.error("Add to cart error:", error.message);
        console.error("Full error:", error);
        return res.json({status:false,message:"Server error", error: error.message});
    }
}
exports.getCartItems = async (req,res)=>{
  try{
    const { userId } = req.query;
    const cartItems = await addtocarts.find({userId: userId});
    if(cartItems){
      return res.json({status:true,message:"Cart items fetched successfully",cartItems});
    }else{
      return res.json({status:false,message:"Cart items not found"});
    }
  }catch(error){
    console.error("Get cart items error:", error.message);
    return res.json({status:false,message:"Server error", error: error.message});
  }
}
exports.clearCart = async(req,res)=>{
  try{
    const {userId,cartItems} = req.body;
    const clearCart = await addtocarts.deleteMany({userId: userId,productId: {$in: cartItems.map(item => item.productId)}});
    if(clearCart){
      return res.json({status:true,message:"Cart cleared successfully"});
    }else{
      return res.json({status:false,message:"Cart not cleared"});
    }
  }catch(error){
    return res.json({status:false,message:"Server error", error: error.message});
  }
}
exports.deleteItem = async(req,res)=>{
  const {id} = req.params;
  const {userId} = req.query;
  try{
    const deleteItem = await addtocarts.findOneAndDelete({_id:id,userId:userId});
    if(deleteItem){
      return res.json({status:true,message:"Item deleted from cart successfully"});
    }else{
      return res.json({status:false,message:"Item not found in cart"});
    }
  }catch(error){
    return res.json({status:false,message:"Server error", error: error.message});
  }
}
exports.updateQuantity = async(req,res)=>{
  try{
    const {userId,ItemId,quantity} = req.body;
    const updateQuantity = await addtocarts.findOneAndUpdate({userId: userId, _id:ItemId}, {quantity: quantity});
    if(updateQuantity){
      return res.json({status:true,message:"Quantity updated successfully",updateQuantity});
    }else{
      return res.json({status:false,message:"Quantity not updated"});
    }
  }catch(error){
    return res.json({status:false,message:"Server error", error: error.message});
  }
}

exports.updateProfileImage = async(req,res)=>{
  try{
    if(!req.file){
      return res.json({status:false,message:"No file uploaded"});
    }

    const { email } = req.body;
    
    if(!email){
      return res.json({status:false,message:"Email is required"});
    }

    // Create URL for the uploaded image
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    // Update user's profileImage in database
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { profileImage: imageUrl },
      { new: true }
    );

    if(!updatedUser){
      return res.json({status:false,message:"User not found"});
    }

    return res.json({
      status:true,
      message:"Profile image updated successfully",
      profileImage: imageUrl,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage
      }
    });
  }catch(error){
    console.error("Update profile image error:", error);
    return res.json({status:false,message:"Server error", error: error.message});
  }
}
exports.addAddress = async(req,res)=>{
  try{
    const {userId,name,email,address,city,state,zipCode,country,phoneNumber} = req.body;
    if(!name || !email || !address || !city || !state || !zipCode || !country || !phoneNumber){
      return res.json({status:false,message:"PLease fill all the required fields for adding address"});
    }
    const addAddress = await Address.create({userId,name,email,address,city,state,zipCode,country,phoneNumber});
  
    if(addAddress){
      return res.json({status:true,message:"Address added successfully",addAddress});
    }else{
      return res.json({status:false,message:"Address not added"});
    }
  }catch(error){
    return res.json({status:false,message:"Server error", error: error.message});
  }
}
exports.createRazorpayOrder = async(req,res)=>{
  try{
    const {amount, currency = 'INR'} = req.body; 
    const amountInPaise = Math.round(amount * 100);
    
    const options = {
      amount: amountInPaise,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1  // Auto capture payment
    };
    
    const order = await razorpay.orders.create(options);
    
    return res.json({
      status:true,
      message:"Order created successfully",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
    
  }catch(error){
    console.error("Create Razorpay order error:", error);
    return res.json({status:false,message:"Failed to create order", error: error.message});
  }
}

exports.createOrder = async(req,res)=>{
  try{
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      cartItems,
      address,
      subtotal,
      shipping,
      total
    } = req.body;
  
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
      return res.json({status:false,message:"Payment details are required"});
    }
    
    if(!userId || !cartItems || !address){
      return res.json({status:false,message:"User ID, cart items, and address are required"});
    }
    
    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", 'buQ1F1WXfYKQdSzjILSoDAxN')
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch:", {
        expected: expectedSignature,
        received: razorpay_signature
      });
      return res.json({
        status: false,
        message: "Payment verification failed - Invalid signature"
      });
    }
    
    // Handle address - if array, take first element
    const shippingAddress = Array.isArray(address) ? address[0] : address;
    
    // Save order
    const order = await orders.create({
      userId,
      items: cartItems.map(item => ({
        productId: item.productId || item._id,
        name: item.ProductName,
        image: item.ProductImage,
        price: item.ProductPrice || item.price,
        quantity: item.quantity || item.totalQuantity || 1
      })),
      shippingAddress: shippingAddress,
      subtotal: subtotal || 0,
      shipping: shipping || 0,
      totalAmount: total || (subtotal + shipping),
      payment: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        method: "RAZORPAY",
        status: "PAID"
      },
      orderStatus: "PLACED"
    });

    // Clear cart after successful order
    await addtocarts.deleteMany({ userId });

    return res.json({
      status: true,
      message: "Order placed successfully",
      orderId: order._id,
      order: order
    });

  } catch (error) {
    console.error("Create order error:", error);
    return res.json({
      status: false,
      message: "Order creation failed",
      error: error.message
    });
  }
}
exports.getOrders = async (req,res)=>{
try{
  const orderList = await orders.find().sort({ createdAt: -1 });
  return res.json({
    status: true,
    orders: orderList
  });
}
catch(error){
  console.error("Get orders error:", error);
  return res.json({
    status: false,
    message: "Failed to fetch orders",
    error: error.message
  });
}
}