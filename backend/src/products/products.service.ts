import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll() {
    const supabase = this.supabaseService.getClient();

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Error al obtener productos');
    }

    return {
      message: 'Productos obtenidos exitosamente',
      products: products || [],
    };
  }

  async findOne(id: string) {
    const supabase = this.supabaseService.getClient();

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return {
      message: 'Producto encontrado',
      product,
    };
  }

  async findByUser(userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Error al obtener productos del usuario');
    }

    return {
      message: 'Productos del usuario obtenidos exitosamente',
      products: products || [],
    };
  }

  async create(createProductDto: CreateProductDto, userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          ...createProductDto,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error('Error al crear el producto');
    }

    return {
      message: 'Producto creado exitosamente',
      product,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto, userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data: existingProduct, error: findError } = await supabase
      .from('products')
      .select('user_id')
      .eq('id', id)
      .single();

    if (findError || !existingProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (existingProduct.user_id !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar este producto',
      );
    }

    const { data: product, error } = await supabase
      .from('products')
      .update(updateProductDto)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error('Error al actualizar el producto');
    }

    return {
      message: 'Producto actualizado exitosamente',
      product,
    };
  }

  async delete(id: string, userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data: existingProduct, error: findError } = await supabase
      .from('products')
      .select('user_id')
      .eq('id', id)
      .single();

    if (findError || !existingProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (existingProduct.user_id !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este producto',
      );
    }

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      throw new Error('Error al eliminar el producto');
    }

    return {
      message: 'Producto eliminado exitosamente',
    };
  }
}
