# Procedimiento de entrega a clientes

Documento interno de JF Consultoría Web. Describe cómo se contrata, desarrolla, revisa, publica y entrega una web.
El procedimiento puede variar según el proyecto: ante cualquier diferencia, prevalece lo acordado con el cliente.

> No guardar en este documento contraseñas, tokens, URLs privadas ni datos personales de clientes.

## Condiciones comerciales vigentes

| Plan | Precio (ARS) | Secciones | Entrega | Dominio propio |
|---|---|---|---|---|
| Inicial | $279.900 | Hasta 3 | ~5 días hábiles | Asesoramiento. La conexión técnica se cotiza aparte |
| Profesional | $499.900 | Hasta 5 | ~7 días hábiles | Configuración inicial incluida |
| Premium | $799.900 | Hasta 8 | ~12 días hábiles | Configuración inicial incluida |

- Los importes viven en `src/lib/pricing.ts`; si cambian, actualizar también esta tabla.
- **Precio único** por el desarrollo, sin abonos mensuales obligatorios cobrados por JF.
- **Forma de pago:** 50% para comenzar y 50% al entregar. "Precio único" no significa pago en una sola cuota.
- **Plazos:** comienzan desde la confirmación del anticipo del 50% y la recepción de los materiales necesarios.
- **Publicación inicial incluida** en los tres planes: el cliente recibe su web publicada, con una dirección web lista para compartir.
- **Dominio:** lo compra y renueva el cliente. JF nunca compra ni paga dominios con el precio del desarrollo.
- **Ronda de ajustes:** una sola ronda incluida en los tres planes, antes de la aprobación final (ver [qué incluye](#qué-incluye-la-única-ronda-de-ajustes)).
- **No incluido en ningún plan** (se cotiza aparte, antes de contratarlo): tienda online con pagos, carrito y checkout, sistema de reservas, panel de administración, automatizaciones avanzadas, integraciones externas pagas, alojamiento pago y servicios de terceros.
- **SEO:** el Profesional incluye SEO on-page básico y el Premium uno más completo. El Inicial no incluye SEO on-page. Nunca se garantizan posiciones en Google, visitas, consultas ni ventas.
- **Personalización:** los diseños del catálogo son referencias que se adaptan a la identidad del negocio (o el cliente pide una web personalizada sin elegir modelo), siempre dentro de las secciones y el nivel de personalización del plan. No hay personalización ilimitada.

## Proceso comercial

El mismo procedimiento se aplica a los tres planes: Inicial, Profesional y Premium.
En la web pública se resume en cuatro pasos: **01 Nos contás tu idea** (etapas 1 a 3), **02 Diseñamos tu web** (etapa 4), **03 Revisás y aprobás** (etapas 5 y 6) y **04 Publicamos y entregamos** (etapas 7 y 8).

1. **Primer contacto y contratación.** El cliente escribe por WhatsApp o completa el formulario. Se responde la consulta, se envía el presupuesto y se confirma la contratación por escrito: plan, alcance (cantidad de secciones), diseño de referencia del catálogo o web personalizada, plazo y precio.
2. **Pago del 50% inicial.** El plazo de entrega comienza desde la confirmación de este anticipo **y** la recepción de los materiales necesarios. Mientras falten materiales, el plazo no corre.
3. **Reunión inicial.** Se coordina por WhatsApp una reunión por Meet, Zoom u otra videollamada; JF envía el enlace. Se recopila la información de la [lista de la reunión inicial](#información-a-solicitar-en-la-reunión-inicial). Al terminar, se confirma por WhatsApp un resumen de lo acordado y la lista de materiales pendientes.
4. **Desarrollo y primera versión.** JF trabaja sobre una **copia independiente** de la plantilla de referencia (o sobre una base propia, si es una web personalizada). Las nueve plantillas originales y sus demos no se modifican nunca. Se publica una primera versión en un enlace de vista previa para que el cliente la revise funcionando.
5. **Ronda de ajustes (una sola, incluida).** El cliente reúne todas sus observaciones y las envía **juntas, en un único mensaje o documento**. JF las aplica según lo definido en [qué incluye la ronda de ajustes](#qué-incluye-la-única-ronda-de-ajustes). Si el cliente aprueba la primera versión sin cambios, esta etapa se omite.
6. **Presentación de los ajustes y aprobación final.** Se muestran los ajustes realizados y el cliente da su aprobación final por escrito. Esta presentación **no habilita una segunda ronda** de cambios nuevos. Los errores de implementación atribuibles a JF se corrigen sin costo.
7. **Publicación definitiva.**
   - La web se publica en una **cuenta de alojamiento controlada por el cliente**. JF se encarga de la configuración técnica: el cliente no necesita programar ni subir archivos.
   - **Dominio según el plan:** el cliente lo registra, paga y renueva a su nombre. En el plan Inicial JF lo asesora y la conexión se cotiza aparte; en Profesional y Premium JF realiza la configuración inicial del dominio propio que el cliente proporcione. Los servicios externos pagos y las configuraciones extraordinarias se cotizan por separado.
   - **Verificación:** botón y enlaces de WhatsApp con el número correcto; envío del formulario con una prueba real del propio cliente; HTTPS (candado) en la dirección provista y en el dominio propio, si lo hay; visualización en celular, tablet y computadora.
8. **Entrega y pago del saldo.** El cliente abona el 50% restante según las condiciones acordadas y se le entregan los accesos a la cuenta de alojamiento (si JF la gestionó en su nombre, se transfiere) y una copia del proyecto.

### Revisiones durante el desarrollo y soporte post-entrega

Son dos cosas distintas y no deben mezclarse al comunicarlas:

- **Ronda de ajustes:** ocurre **antes** de la aprobación final (etapas 5 y 6). Es una sola e igual para los tres planes.
- **Soporte post-entrega:** empieza **después** de la entrega (etapa 8). Su duración y alcance por plan están pendientes de definición (ver abajo). Hoy la web pública solo menciona 30 días de soporte en el plan Premium. Las modificaciones posteriores, las nuevas secciones y las funcionalidades nuevas se cotizan aparte.

## Información a solicitar en la reunión inicial

- **Negocio:** nombre comercial, rubro, a qué se dedica, público objetivo y qué lo diferencia de la competencia.
- **Objetivo de la web:** qué debe hacer el visitante (escribir por WhatsApp, pedir presupuesto, consultar disponibilidad, conocer los servicios).
- **Plan y alcance:** plan contratado, diseño de referencia del catálogo (código, por ejemplo PREMIUM-02) o web personalizada, y las secciones dentro del máximo del plan (3, 5 u 8).
- **Logo:** en buena calidad, idealmente vectorial o PNG con fondo transparente.
- **Colores y tipografías** de la marca, si las tiene.
- **Imágenes:** fotos propias del negocio, productos, equipo o trabajos realizados. Si no tiene, se acuerda el uso de imágenes de bancos libres.
- **Textos:** presentación del negocio y descripción de cada servicio o producto. Si el cliente no los tiene, se acuerda quién los redacta.
- **Servicios o productos:** lista con nombre, descripción breve y, si quiere mostrarlos, precios.
- **Datos de contacto:** número de WhatsApp para el botón, email, dirección, horarios, zona de cobertura y redes sociales.
- **Formulario:** a qué email o canal deben llegar las consultas.
- **Referencias visuales:** webs que le gustan o no, y qué le atrae de cada una.
- **Dominio:** si ya tiene uno, dónde está registrado y quién tiene el acceso; si no, qué nombre le interesa.
- **Requisitos del proyecto:** cualquier necesidad fuera del plan (tienda, reservas, integraciones, varios idiomas). Se aclara en la reunión que se cotiza aparte, antes de comenzar.
- **Fechas:** cuándo puede enviar los materiales pendientes y si tiene una fecha límite propia (lanzamiento, evento).

## Qué incluye la única ronda de ajustes

**Incluye**, sobre la primera versión y dentro del alcance contratado:

- Cambios y correcciones de textos, títulos y datos de contacto.
- Reemplazo de imágenes o del logo por otros que provea el cliente.
- Ajustes de colores, tipografías, tamaños y espaciados dentro del estilo del diseño.
- Reordenar las secciones acordadas o los elementos dentro de ellas.
- Ajustes de enlaces, botones y destinos de WhatsApp o del formulario.

**No incluye** (se cotiza aparte, antes de hacerlo):

- Un rediseño completo o el cambio a otro diseño de referencia.
- Secciones adicionales por encima del máximo del plan.
- Funcionalidades fuera del alcance del plan (tienda, pagos, reservas, panel de administración, integraciones pagas).
- Observaciones nuevas enviadas después de la ronda, incluidas las surgidas al presentar los ajustes.
- Nuevos cambios sobre contenido que el cliente ya aprobó.

**Siempre sin costo:** los errores de implementación atribuibles a JF (algo acordado que no funciona o quedó distinto de lo pedido). Su corrección no consume la ronda de ajustes.

## Pendiente de definición comercial

- **Duración del soporte post-entrega por plan.** Hoy la web pública dice "30 días de soporte post-entrega" solo en el plan Premium, y no hay una duración definida para Inicial ni Profesional. Hay que elegir una política. El campo `revision_incluida` que se envía a Make (columna H de la planilla) registra desde 2026-10-27 «1 ronda de ajustes» en los tres planes; no representa el soporte post-entrega.
- **Qué cubre el soporte:** por ejemplo, corrección de errores y ajustes menores de texto, a diferencia de cambios de diseño o secciones nuevas.
- **Tiempo de respuesta** a consultas: la web promete "menos de 24 hs".
- **Precio de los adicionales** más comunes, como la conexión de dominio en el plan Inicial o una sección extra.
