import { CheckCircle2, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";

const formatPrice = (value: number) => `S/ ${value.toFixed(2)}`;

export function CartSheet() {
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.total());
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    clearCart();
    setPurchaseComplete(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl hover:bg-blue-500/10 hover:text-blue-300"
          aria-label={`Carrito con ${itemCount} productos`}
        >
          <ShoppingCart />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white shadow-md shadow-blue-600/30">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full border-white/10 sm:max-w-md">
        <SheetHeader className="border-b border-white/8 p-6">
          <div className="mb-3 grid size-11 place-items-center rounded-2xl bg-blue-500/10 text-blue-300">
            <ShoppingBag />
          </div>
          <SheetTitle className="text-xl">Tu selección</SheetTitle>
          <SheetDescription>
            {itemCount === 0 ? "Agrega una película para comenzar." : `${itemCount} entrada${itemCount === 1 ? "" : "s"} en tu carrito.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-2">
          {items.length === 0 && !purchaseComplete && (
            <div className="grid h-full min-h-64 place-content-center text-center">
              <ShoppingCart className="mx-auto size-10 text-muted-foreground/50" />
              <p className="mt-4 font-medium">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-muted-foreground">Explora la cartelera y elige tu próxima película.</p>
            </div>
          )}

          {purchaseComplete && items.length === 0 && (
            <div className="grid h-full min-h-64 place-content-center px-4 text-center">
              <CheckCircle2 className="mx-auto size-12 text-emerald-400" />
              <p className="mt-4 text-lg font-semibold">¡Compra simulada con éxito!</p>
              <p className="mt-2 text-sm text-muted-foreground">Tu carrito fue procesado y está listo para una nueva selección.</p>
            </div>
          )}

          {items.map((item) => (
            <article key={item.id} className="flex gap-4 rounded-xl border border-white/8 bg-white/3 p-3">
              <img src={item.posterUrl} alt={item.title} className="h-24 w-16 rounded-lg object-cover" />
              <div className="min-w-0 flex-1 py-1">
                <h3 className="truncate font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.quantity} × {formatPrice(item.price)}</p>
                <p className="mt-2 text-sm font-semibold text-blue-300">{formatPrice(item.price * item.quantity)}</p>
              </div>
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-red-300" aria-label={`Eliminar ${item.title}`} onClick={() => removeFromCart(item.id)}>
                <Trash2 />
              </Button>
            </article>
          ))}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-white/8 bg-black/10 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <strong className="text-2xl">{formatPrice(total)}</strong>
            </div>
            <Separator />
            <Button className="h-11 w-full bg-blue-600 hover:bg-blue-500" onClick={handleCheckout}>
              Simular compra
            </Button>
            <Button variant="ghost" onClick={clearCart}>Vaciar carrito</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
