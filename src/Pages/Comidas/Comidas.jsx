import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cinePlusApi from "../../api/cinePlusApi";

export const Comidas = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { status, email } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await cinePlusApi.get('/listarProductos');
                const data = Array.isArray(response.data) ? response.data : [];
                setProductos(data);
            } catch (error) {
                console.error('Error fetching productos:', error);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    const onAddProduct = async product => {
        if (!status) {
            navigate('/plssignin');
            return;
        }
        if (allProducts.find(item => item.id === product._id)) {
            const products = allProducts.map(item =>
                item.id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + parseFloat(product.precio));
            setCountProducts(countProducts + 1);
        // añadir producto a la orden del usuario
        try{
            const {data} = await cinePlusApi.get(`/obtenerOrdenDeUsuario/${email}`);
            const {_id} = data;

            cinePlusApi.put("/agregarProductoAOrden", {
                ordenId: _id,
                productoId: product._id
            });

        }catch(error){
            console.log(error)
        }
            return setAllProducts([...products]);
        }

        setTotal(total + parseFloat(product.precio));
        setCountProducts(countProducts + 1);
        setAllProducts([...allProducts, { ...product, id: product._id, quantity: 1 }]);
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='container-items'>
            {productos.map(product => (
                <div className='item' key={product._id}>
                    <figure>
                        <img src={product.img} alt={product.name} />
                    </figure>
                    <div className='info-product'>
                        <h2>{product.name}</h2>
                        <p className='price'>${product.precio}</p>
                        <button onClick={() => onAddProduct(product)}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
