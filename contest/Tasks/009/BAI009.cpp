#include <bits/stdc++.h>
#define maxn 1003
#define maxc 1000000003

using namespace std;


int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    int n, l, r, a, b, ans = 0, u;
    cin >> l >> r >> a >> b;
    a = a * b / __gcd(a, b);
    cout << r / a - (l - 1) / a;
}
