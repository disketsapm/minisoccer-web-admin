import { toast } from '@/components/ui/use-toast';
import { RegisterRequestBody } from '@/interfaces/auth.interface';
import { AuthService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useRegister() {
    const authService = new AuthService();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: RegisterRequestBody) => authService.register(data),
        onSuccess: () => {
            toast({
                title: 'Register success',
                description: 'Please confirm your email',
                variant: 'default',
                duration: 5000,
            });
            setTimeout(() => {
                router.push('/login');
            }, 5000);
        },
        onError: (error) => {
            toast({
                title: 'Register failed',
                description: error.message,
                variant: 'destructive',
                duration: 5000,
            });
        },
    });
}
