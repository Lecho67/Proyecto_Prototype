import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cinePlusApi from "../../api/cinePlusApi";
import { useRef } from "react";
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
    const isAddingRef = useRef(false);

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
        isAddingRef.current = true; // Deshabilitar el botón al comenzar la petición
    
        try {
            let products = [];
            if (allProducts.find(item => item.id === product._id)) {
                products = allProducts.map(item =>
                    item.id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                setTotal(total + parseFloat(product.precio));
                setCountProducts(countProducts + 1);
            } else {
                products = [...allProducts, { ...product, id: product._id, quantity: 1 }];
                setTotal(total + parseFloat(product.precio));
                setCountProducts(countProducts + 1);
            }
    
            // Añadir producto a la orden del usuario
            const { data } = await cinePlusApi.get(`/obtenerOrdenDeUsuario/${email}`);
            const { _id } = data;
            console.log(_id);
            console.log(data);
            await cinePlusApi.put("/agregarProductoAOrden", {
                ordenId: _id,
                productoId: product._id
            });
    
            setAllProducts(products);
        } catch (error) {
            console.log(error);
        } finally {
            isAddingRef.current = false; // Habilitar el botón después de que la petición haya terminado
        }
    };
    
    

    if (loading) return <><div className="loadingContainer"><p className="loadingMiOrden">Cargando Comidas...</p></div><style>{"body {cursor: wait}"}</style></>;
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
                        <button style={isAddingRef.current ? { cursor: 'wait' } : { cursor: 'pointer' }} disabled={isAddingRef.current} onClick={() => onAddProduct(product)}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
